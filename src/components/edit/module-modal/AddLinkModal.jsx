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

import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./AddLinkModal.module.css";

function AddLinkModal({
    linkTextSetter,
    setIsAddLinkModalVisible,
    setResourcesArray,
}) {
    const [resourceType, setResourceType] = useState(""),
        [price, setPrice] = useState(0),
        [isbn, setISBN] = useState(""),
        [otherType, setOtherType] = useState(""),
        [linkText, setLinkText] = useState(""),
        [url, setUrl] = useState("");
    // Add date of entering resource

    function handleSubmit(e) {
        e.preventDefault();

        const isSubmissionValid = validateResourceSubmission();

        if (isSubmissionValid) {
            const resourceId = nanoid();
            linkTextSetter(`[${linkText ? linkText : url}](${url})`);
            setResourcesArrayDependingOnType(resourceId);
            setIsAddLinkModalVisible(false);
        } else if (price < 0) {
            alert("Cannot accept a negative number for price");
        } else {alert("Please fill in the required details");}
    }

    function validateResourceSubmission(){
    // Required resources
    // I feel like resource types for the Practice section should be different from
    // In Learn section? TO DO.
        let isResourceValid;
        isResourceValid = resourceType && price >= 0 && url
        return isResourceValid
    }

    function setResourcesArrayDependingOnType(resourceId) {
        switch (resourceType) {
        case "book":
            setResourcesArray((arr) => [
                ...arr,
                {
                    id: resourceId,
                    url,
                    resourceType: "book",
                    price,
                    isbn,
                },
            ]);
            break;
        case "other":
            setResourcesArray((arr) => [
                ...arr,
                {
                    id: resourceId,
                    url,
                    resourceType: `other: ${otherType}`,
                    price,
                },
            ]);
            break;
        default:
            setResourcesArray((arr) => [
                ...arr,
                {
                    id: resourceId,
                    url,
                    resourceType,
                    price,
                },
            ]);
        }
    }

    return (
        <div className={styles.form}>
            <fieldset>
                <select
                    onChange={(e) => setResourceType(e.target.value)}
                    required
                    value={resourceType}
                >
                    <option>
                        Select resource type*
                    </option>

                    <option value="article">
                        Online Article (Wikipedia, Medium, docs, blogs, etc.)
                    </option>

                    <option value="course">
                        Online Course (Coursera, edx, Udemy, etc.)
                    </option>

                    <option value="video">
                        Video or Video Playlist (Youtube, Vimeo, etc.)
                    </option>

                    <option value="book">
                        Book (online bookstores, online archives, etc.)
                    </option>

                    <option value="forum">
                        Forum or Q&A (Stack Overflow, Reddit, etc.)
                    </option>

                    <option value="audio">
                        Audio (Apple Podcasts, Spotify Podcasts, etc.)
                    </option>

                    <option value="image">
                        Image or Image Album (Museum or gallery websites, etc.)
                    </option>

                    <option value="other">
                        Other document
                    </option>
                </select>

                <div className={styles.sectionDiv}>
                    <label htmlFor="price">
                        Price* (USD):
                    </label>

                    <input
                        id="price"
                        min="0"
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter resource price in USD (Enter 0 if free)"
                        required
                        type="number"
                        value={price}
                    />
                </div>

                {resourceType === "book" && (
                    <div className={styles.sectionDiv}>
                        <label htmlFor="ISBN">
                            ISBN:
                            {' '}
                        </label>

                        <input
                            id="ISBN"
                            onChange={(e) => setISBN(e.target.value)}
                            placeholder="(optional) Enter Book ISBN here"
                            value={isbn}
                        />
                    </div>
                )}

                {resourceType === "other" && (
                    <div className={styles.sectionDiv}>
                        <label htmlFor="other">
                            Other resource type:
                        </label>

                        <input
                            id="other"
                            onChange={(e) => setOtherType(e.target.value)}
                            placeholder="Enter resource type"
                            value={otherType}
                        />
                    </div>
                )}

                <div className={styles.sectionDiv}>
                    <label htmlFor="url">
                        URL*
                    </label>

                    <input
                        id="url"
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL starting with http:// or https://"
                        required
                        value={url}
                    />
                </div>

                <div className={styles.sectionDiv}>
                    <label htmlFor="text">
                        Text
                    </label>

                    <textarea
                        onChange={(e) => setLinkText(e.target.value)}
                        placeholder="Enter the text that will be linked to the URL"
                        value={linkText}
                    />
                </div>

                <div>
                    *required
                </div>

                <div className={styles.submitButtonDiv}>
                    <button onClick={handleSubmit}>
                        + Add Link
                    </button>
                </div>
            </fieldset>
        </div>
    );
}

export default AddLinkModal;
