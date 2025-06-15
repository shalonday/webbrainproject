/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import styles from "./MainTextSection.module.css";
import { useRef, useState } from "react";
import AddLinkModal from "./AddLinkModal";
import TextEditor from "./TextEditor";
import MainButton from "../../MainButton";

function MainTextSection({
  learnText,
  setLearnText,
  practiceText,
  setPracticeText,
  setResourcesArray,
}) {
  const [learnLinkText, setLearnLinkText] = useState("");
  const [practiceLinkText, setPracticeLinkText] = useState("");
  const [isLearnAddLinkModalVisible, setIsLearnAddLinkModalVisible] =
    useState(false);
  const [isPracticeAddLinkModalVisible, setIsPracticeAddLinkModalVisible] =
    useState(false);
  const linkTextSetter = useRef();

  function handleAddLinkLearn() {
    linkTextSetter.current = setLearnLinkText;
    setIsLearnAddLinkModalVisible(true);
  }

  function handleAddLinkPractice() {
    // get ref to focused textarea
    // concatenate link url or some other text or span to textarea via ref
    linkTextSetter.current = setPracticeLinkText;
    setIsPracticeAddLinkModalVisible(true);
  }

  return (
    <>
      <fieldset className={styles.learn}>
        <h3>Learn</h3>
        {!isLearnAddLinkModalVisible && (
          <MainButton onClick={handleAddLinkLearn}>Link a resource</MainButton>
        )}
        {isLearnAddLinkModalVisible && (
          <AddLinkModal
            linkTextSetter={linkTextSetter.current}
            setIsAddLinkModalVisible={setIsLearnAddLinkModalVisible}
            setResourcesArray={setResourcesArray}
          />
        )}
        <TextEditor
          presetText={learnText}
          textToAppend={learnLinkText}
          onChange={(markdown) => setLearnText(markdown)}
        />
      </fieldset>
      <fieldset className={styles.practice}>
        <h3>Practice</h3>
        {!isPracticeAddLinkModalVisible && (
          <MainButton onClick={handleAddLinkPractice}>
            Link a resource
          </MainButton>
        )}
        {isPracticeAddLinkModalVisible && (
          <AddLinkModal
            linkTextSetter={linkTextSetter.current}
            setIsAddLinkModalVisible={setIsPracticeAddLinkModalVisible}
            setResourcesArray={setResourcesArray}
          />
        )}
        <TextEditor
          presetText={practiceText}
          textToAppend={practiceLinkText}
          onChange={(markdown) => setPracticeText(markdown)}
        />
      </fieldset>
    </>
  );
}

export default MainTextSection;
