module.exports = function (config) {
  config.addLiquidFilter("date", (value) =>
    [value.getMonth() + 1, value.getDate(), value.getFullYear()].join(".")
  );

  config.addLayoutAlias("base", "base.html");

  config.addPassthroughCopy("src/images");
  config.addPassthroughCopy("src/css");
  config.addPassthroughCopy("src/js");

  config.addWatchTarget("src/css");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      layouts: "layouts",
      data: "data",
    },
  };
};
