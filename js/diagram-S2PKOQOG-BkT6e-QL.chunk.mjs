const appName = "text";
const appVersion = "7.0.0-dev.2";
import { _ as __name, F as cleanAndMerge, K as selectSvgElement, e as configureSvgSize, l as log, b as setAccTitle, a as getAccTitle, q as setDiagramTitle, t as getDiagramTitle, g as getAccDescription, s as setAccDescription, G as getConfig, H as defaultConfig_default, z as clear } from "./mermaid.core-DchgNR_P.chunk.mjs";
import { p as populateCommonDb } from "./chunk-4BX2VUAB-BVv3b0aB.chunk.mjs";
import { p as parse } from "./treemap-KMMF4GRG-CT1igcLy.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import "./index-Djlbe-Du.chunk.mjs";
import "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
import "./_baseUniq-BAgO0fq_.chunk.mjs";
import "./_basePickBy-Ch8wm704.chunk.mjs";
import "./clone-BtjdRD6Z.chunk.mjs";
var DEFAULT_PACKET_CONFIG = defaultConfig_default.packet;
var PacketDB = class {
  constructor() {
    this.packet = [];
    this.setAccTitle = setAccTitle;
    this.getAccTitle = getAccTitle;
    this.setDiagramTitle = setDiagramTitle;
    this.getDiagramTitle = getDiagramTitle;
    this.getAccDescription = getAccDescription;
    this.setAccDescription = setAccDescription;
  }
  static {
    __name(this, "PacketDB");
  }
  getConfig() {
    const config = cleanAndMerge({
      ...DEFAULT_PACKET_CONFIG,
      ...getConfig().packet
    });
    if (config.showBits) {
      config.paddingY += 10;
    }
    return config;
  }
  getPacket() {
    return this.packet;
  }
  pushWord(word) {
    if (word.length > 0) {
      this.packet.push(word);
    }
  }
  clear() {
    clear();
    this.packet = [];
  }
};
var maxPacketSize = 1e4;
var populate = /* @__PURE__ */ __name((ast, db) => {
  populateCommonDb(ast, db);
  let lastBit = -1;
  let word = [];
  let row = 1;
  const { bitsPerRow } = db.getConfig();
  for (let { start, end, bits, label } of ast.blocks) {
    if (start !== void 0 && end !== void 0 && end < start) {
      throw new Error(`Packet block ${start} - ${end} is invalid. End must be greater than start.`);
    }
    start ??= lastBit + 1;
    if (start !== lastBit + 1) {
      throw new Error(
        `Packet block ${start} - ${end ?? start} is not contiguous. It should start from ${lastBit + 1}.`
      );
    }
    if (bits === 0) {
      throw new Error(`Packet block ${start} is invalid. Cannot have a zero bit field.`);
    }
    end ??= start + (bits ?? 1) - 1;
    bits ??= end - start + 1;
    lastBit = end;
    log.debug(`Packet block ${start} - ${lastBit} with label ${label}`);
    while (word.length <= bitsPerRow + 1 && db.getPacket().length < maxPacketSize) {
      const [block, nextBlock] = getNextFittingBlock({ start, end, bits, label }, row, bitsPerRow);
      word.push(block);
      if (block.end + 1 === row * bitsPerRow) {
        db.pushWord(word);
        word = [];
        row++;
      }
      if (!nextBlock) {
        break;
      }
      ({ start, end, bits, label } = nextBlock);
    }
  }
  db.pushWord(word);
}, "populate");
var getNextFittingBlock = /* @__PURE__ */ __name((block, row, bitsPerRow) => {
  if (block.start === void 0) {
    throw new Error("start should have been set during first phase");
  }
  if (block.end === void 0) {
    throw new Error("end should have been set during first phase");
  }
  if (block.start > block.end) {
    throw new Error(`Block start ${block.start} is greater than block end ${block.end}.`);
  }
  if (block.end + 1 <= row * bitsPerRow) {
    return [block, void 0];
  }
  const rowEnd = row * bitsPerRow - 1;
  const rowStart = row * bitsPerRow;
  return [
    {
      start: block.start,
      end: rowEnd,
      label: block.label,
      bits: rowEnd - block.start
    },
    {
      start: rowStart,
      end: block.end,
      label: block.label,
      bits: block.end - rowStart
    }
  ];
}, "getNextFittingBlock");
var parser = {
  // @ts-expect-error - PacketDB is not assignable to DiagramDB
  parser: { yy: void 0 },
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("packet", input);
    const db = parser.parser?.yy;
    if (!(db instanceof PacketDB)) {
      throw new Error(
        "parser.parser?.yy was not a PacketDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues."
      );
    }
    log.debug(ast);
    populate(ast, db);
  }, "parse")
};
var draw = /* @__PURE__ */ __name((_text, id, _version, diagram2) => {
  const db = diagram2.db;
  const config = db.getConfig();
  const { rowHeight, paddingY, bitWidth, bitsPerRow } = config;
  const words = db.getPacket();
  const title = db.getDiagramTitle();
  const totalRowHeight = rowHeight + paddingY;
  const svgHeight = totalRowHeight * (words.length + 1) - (title ? 0 : rowHeight);
  const svgWidth = bitWidth * bitsPerRow + 2;
  const svg = selectSvgElement(id);
  svg.attr("viewbox", `0 0 ${svgWidth} ${svgHeight}`);
  configureSvgSize(svg, svgHeight, svgWidth, config.useMaxWidth);
  for (const [word, packet] of words.entries()) {
    drawWord(svg, packet, word, config);
  }
  svg.append("text").text(title).attr("x", svgWidth / 2).attr("y", svgHeight - totalRowHeight / 2).attr("dominant-baseline", "middle").attr("text-anchor", "middle").attr("class", "packetTitle");
}, "draw");
var drawWord = /* @__PURE__ */ __name((svg, word, rowNumber, { rowHeight, paddingX, paddingY, bitWidth, bitsPerRow, showBits }) => {
  const group = svg.append("g");
  const wordY = rowNumber * (rowHeight + paddingY) + paddingY;
  for (const block of word) {
    const blockX = block.start % bitsPerRow * bitWidth + 1;
    const width = (block.end - block.start + 1) * bitWidth - paddingX;
    group.append("rect").attr("x", blockX).attr("y", wordY).attr("width", width).attr("height", rowHeight).attr("class", "packetBlock");
    group.append("text").attr("x", blockX + width / 2).attr("y", wordY + rowHeight / 2).attr("class", "packetLabel").attr("dominant-baseline", "middle").attr("text-anchor", "middle").text(block.label);
    if (!showBits) {
      continue;
    }
    const isSingleBlock = block.end === block.start;
    const bitNumberY = wordY - 2;
    group.append("text").attr("x", blockX + (isSingleBlock ? width / 2 : 0)).attr("y", bitNumberY).attr("class", "packetByte start").attr("dominant-baseline", "auto").attr("text-anchor", isSingleBlock ? "middle" : "start").text(block.start);
    if (!isSingleBlock) {
      group.append("text").attr("x", blockX + width).attr("y", bitNumberY).attr("class", "packetByte end").attr("dominant-baseline", "auto").attr("text-anchor", "end").text(block.end);
    }
  }
}, "drawWord");
var renderer = { draw };
var defaultPacketStyleOptions = {
  byteFontSize: "10px",
  startByteColor: "black",
  endByteColor: "black",
  labelColor: "black",
  labelFontSize: "12px",
  titleColor: "black",
  titleFontSize: "14px",
  blockStrokeColor: "black",
  blockStrokeWidth: "1",
  blockFillColor: "#efefef"
};
var styles = /* @__PURE__ */ __name(({ packet } = {}) => {
  const options = cleanAndMerge(defaultPacketStyleOptions, packet);
  return `
	.packetByte {
		font-size: ${options.byteFontSize};
	}
	.packetByte.start {
		fill: ${options.startByteColor};
	}
	.packetByte.end {
		fill: ${options.endByteColor};
	}
	.packetLabel {
		fill: ${options.labelColor};
		font-size: ${options.labelFontSize};
	}
	.packetTitle {
		fill: ${options.titleColor};
		font-size: ${options.titleFontSize};
	}
	.packetBlock {
		stroke: ${options.blockStrokeColor};
		stroke-width: ${options.blockStrokeWidth};
		fill: ${options.blockFillColor};
	}
	`;
}, "styles");
var diagram = {
  parser,
  get db() {
    return new PacketDB();
  },
  renderer,
  styles
};
export {
  diagram
};
//# sourceMappingURL=diagram-S2PKOQOG-BkT6e-QL.chunk.mjs.map
