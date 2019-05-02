const fs = require("fs");
const sizeOf = require("image-size");

const getContent = () => {
  let data = {};
  fs.readdirSync(__dirname + "/../public/content").forEach(async d => {
    data[d] = {
      name: d
    };
    data[d].images = [];
    fs.readdirSync(__dirname + "/../public/content/" + d + "/original").forEach(name => {
      var { width, height } = sizeOf(__dirname + "/../public/content/" + d + "/original/" + name);
      data[d].images.push({
        name,
        width,
        height,
        url: {
          large: "/content/" + d + "/original/" + name,
          small: "/content/" + d + "/thumbnail/" + name
        }
      });
    });
    const rl = fs
      .readFileSync(__dirname + "/../public/content/" + d + "/content.txt", "utf-8")
      .split("\n")
      .filter(Boolean);

    let i = 1;
    for (const line of rl) {
      if (i === 1) data[d].heading = line;
      if (i === 2) data[d].subheading = line;
      if (i === 4) data[d].description = line;
      if (i === 6) data[d].list = line.split(" | ");
      i++;
    }
  });
  return data;
};

module.exports = getContent();
