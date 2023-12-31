/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Online Brain Project

The Online Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Online Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Online
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import {
  AdmonitionDirectiveDescriptor,
  BoldItalicUnderlineToggles,
  InsertAdmonition,
  ListsToggle,
  MDXEditor,
  directivesPlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { listsPlugin } from "@mdxeditor/editor/plugins/lists";
import { useEffect, useRef } from "react";

function TextEditor({ textToAppend, onChange }) {
  const ref = useRef();
  const markdown = `Add resources, then organize and put them into context here`;

  // Dynamically set text on editor by passing textToAppend to this component
  // See https://mdxeditor.dev/editor/docs/getting-started or my commit message
  // to see why both this and onChange are necessary for my case.
  useEffect(
    function setText() {
      const currentText = ref.current?.getMarkdown();
      ref.current?.setMarkdown(currentText + `${textToAppend}`);
    },
    [textToAppend]
  );
  return (
    <MDXEditor
      className="dark-theme dark-editor"
      ref={ref}
      onChange={onChange} // Detect changes upon typing
      markdown={markdown}
      plugins={[
        linkPlugin(),
        linkDialogPlugin(),
        headingsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        listsPlugin(),
        tablePlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <InsertAdmonition />
            </>
          ),
        }),
      ]}
    />
  );
}

export default TextEditor;
