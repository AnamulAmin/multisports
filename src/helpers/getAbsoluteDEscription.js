// function getAbsoluteDescription(description) {
//   // Step 1: Remove HTML tags using a regular expression
//   const withoutTags = description.replace(/<\/?[^>]+(>|$)/g, "");

//   // Step 2: Trim and remove any extraneous whitespace
//   const cleanedDescription = withoutTags.trim();

//   // Step 3: Return the cleaned description
//   return cleanedDescription;
// }

// export default getAbsoluteDescription;

function getAbsoluteDescription(description) {
  // Step 1: Remove HTML tags using a regular expression
  const withoutTags = description.replace(/<\/?[^>]+(>|$)/g, "");

  // Step 2: Decode HTML entities using DOMParser
  const parser = new DOMParser();
  const decodedString =
    parser.parseFromString(`<!doctype html><body>${withoutTags}`, "text/html")
      .body.textContent || "";

  // Step 3: Trim and remove any extraneous whitespace
  const cleanedDescription = decodedString.trim();

  // Step 4: Return the cleaned description
  return cleanedDescription;
}

export default getAbsoluteDescription;
