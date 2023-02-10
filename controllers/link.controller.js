const linkService = require("../services/link.service");
const userService = require("../services/user.service");
const roles = require("../models/user.model").ROLES;

exports.createLink = async (req, res, next) => {
  try {
    if (!req.body.link || !req.body.destination || !req.body.isProtected) {
      throw new Error("missing required fields");
    }

    if (req.body.isProtected && !req.body.password) {
      throw new Error("missing required fields");
    }
    const user = await userService.getUser(req.username);

    const link = await linkService.createLink(
      req.body.link,
      req.body.destination,
      req.body.isProtected,
      req.body.password || null,
      user._id
    );
    await linkService.addLinkToUser(user._id, link._id);
    res.status(201).json({
      message: "Link created successfully",
    });
  } catch (error) {
    if (error.message.includes("duplicate key")) {
      error.message = "Link already exists";
      error.status = 409;
      return next(error);
    }
    if (error.message.includes("missing required fields")) {
      error.status = 400;
      return next(error);
    }
    console.error(error);
    return next(error);
  }
};

exports.getAllLinks = async (req, res, next) => {
  try {
    const links = await linkService.getAllLinks();
    res.status(200).json({
      links: links,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.getLinks = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.username);
    const links = await linkService.getLinks(user._id);
    res.status(200).json({
      links: links.map((link) => {
        return {
          link: link?.link,
          destination: link?.destination,
          isProtected: link?.isProtected,
          password: link?.password,
          user: link?.user,
        };
      }),
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.getSpecificLink = async (req, res, next) => {
  try {
    const link = await linkService.getOneLink(req.params.link);
    const password = req.query.password;
    if (!link) {
      throw new Error("Link does not exist");
    }
    if (link.isProtected && !password) {
      throw new Error("Link is protected");
    }

    if (link.isProtected) {
      // const isMatch = await userService.comparePassword(
      //   password,
      //   link.password
      // );
      const isMatch = password === link.password;
      if (!isMatch) {
        throw new Error("Wrong password");
      }
    }

    await linkService.addVisit(link._id);
    res.status(200).json({
      link: {
        link: link.link,
        destination: link.destination,
        isProtected: link.isProtected,
        user: link.user,
        visits: link.visits,
      },
    });
  } catch (error) {
    if (error.message.includes("Link does not exist")) {
      error.status = 404;
      return next(error);
    }
    if (error.message.includes("Link is protected")) {
      error.status = 403;
      return next(error);
    }
    console.error(error);
    return next(error);
  }
};

exports.deleteLink = async (req, res, next) => {
  try {
    const link = await linkService.getOneLink(req.params.link);
    if (!link) {
      throw new Error("Link does not exist");
    }
    if (req.role === roles.ADMIN) {
      await linkService.deleteLink(link._id);
      return res.status(200).json({
        message: "Link deleted successfully",
      });
    }
    const user = await userService.getUser(req.username);
    if (user._id.toString() !== link.user.toString()) {
      throw new Error("Unauthorized");
    }
    await linkService.deleteLink(link._id);
    res.status(200).json({
      message: "Link deleted successfully",
    });
  } catch (error) {
    if (error.message.includes("Link does not exist")) {
      error.status = 404;
      return next(error);
    }
    if (error.message.includes("Unauthorized")) {
      error.status = 403;
      return next(error);
    }
    console.error(error);
    return next(error);
  }
};
