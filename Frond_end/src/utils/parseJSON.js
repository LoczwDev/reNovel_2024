import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import { Heading } from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import parse from "html-react-parser";
import { extensions } from "../constants/tiptapExtensions";
const parseJson = (json) => {
  return parse(generateHTML(json, extensions));
};

export default parseJson;
