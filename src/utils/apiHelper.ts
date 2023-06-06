export const maxPage = 3;
export const maxResults = 10;
export const maxQueryResearch=30;
export const maxCompetitors=150;

export function filterResponse(response: any) {
  if (response === undefined || response === null) {
    return [];
  }
  if (Array.isArray(response)) {
    const filteredResponse = response.filter((item: any) => {
      return item[0] !== ' ';
    });
  return filteredResponse;
  }

  return []
  // Loop through the words in the first string
}
export function parseObject(jsonObject: any) {
  let outputArray = [];

  //   console.log(jsonObject);
  if (jsonObject === undefined || jsonObject === null) {
    return [];
  }

  for (let i = 0; i < jsonObject.length; i++) {
    const item = jsonObject[i];

    // check the level of the item and assign the appropriate heading tag
    let tag;
    switch (item.level) {
      case 1:
        tag = 'h1';
        break;
      case 2:
        tag = 'h2';
        break;
      case 3:
        tag = 'h3';
        break;
      case 4:
        tag = 'h4';
        break;
      case 5:
        tag = 'h5';
        break;
      case 6:
        tag = 'h6';
        break;
      default:
        // if level is not specified, default to h1
        tag = 'h1';
    }

    // if the item has primary_content, concatenate all text fields
    let primaryContent = '';
    if (item.primary_content) {
      for (let j = 0; j < item.primary_content.length; j++) {
        const contentItem = item.primary_content[j];
        primaryContent += contentItem.text + ' ';
      }
    }

    // if the item has secondary_content, concatenate all text fields
    let secondaryContent = '';
    if (item.secondary_content) {
      for (let j = 0; j < item.secondary_content.length; j++) {
        const contentItem = item.secondary_content[j];
        secondaryContent += contentItem.text + ' ';
      }
    }

    // create a new object with the appropriate tag and content
    const outputItem1 = {
      [tag]: item.h_title || '',
    };

    outputArray.push(outputItem1);
    let outputItem2 = {};
    if (primaryContent) {
      //   console.log(primaryContent);
      outputItem2 = {
        p: primaryContent.trim() || '',
      };
      outputArray.push(outputItem2);
    }

    let outputItem3 = {};
    if (secondaryContent) {
      outputItem3 = {
        p: secondaryContent.trim() || '',
      };

      outputArray.push(outputItem3);
    }
    // add the output object to the output array
  }

  return outputArray;
}

export const validSubscription = (renewalDate: Date) => {
    const today = new Date();
    if (today > renewalDate) {
      return false;
    }
    return true;
    };
    