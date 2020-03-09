import { setCookie, destroyCookie, parseCookies } from 'nookies';

export function verifyToken(token) {
  const cookies = parseCookies();
  return cookies[token];
}

export function setToken(token) {
  setCookie({}, '_app', token, {
    // 12 Hour Cookie.
    maxAge: 30 * 24 * 60,
    path: '/',
  });
}

export function deleteToken() {
  destroyCookie({}, '_app');
}

export function getTaxonomyIcon(taxonomy) {
  switch (taxonomy) {
    case 'Javascript':
      return 'fab fa-js-square';
    case 'Python':
      return 'fab fa-python';
    case 'React':
      return 'fab fa-react';
    case 'PHP':
      return 'fab fa-php';
    case 'Java':
      return 'fab fa-java';
    default:
      return;
  }
}

export function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function getCommentById(commentID, comments_list) {
  for (let j = 0; j < comments_list.length; j++) {
    if (comments_list[j].comment_ID == commentID) {
      return comments_list[j];
    }
  }
}

function getCommentDepth(theComment, comments_list) {
  let depthLevel = 0;
  while (theComment.comment_parent > 0) {
    theComment = getCommentById(theComment.comment_parent, comments_list);
    depthLevel++;
  }
  return depthLevel;
}

export function arrangeComments(commentsList) {
  let maxDepth = 0;
  for (let i = commentsList.length - 1; i >= 0; i--) {
    if (commentsList[i].comment_approved != 1) {
      commentsList.splice(i, 1);
    }
  }
  for (let i = 0; i < commentsList.length; i += 1) {
    commentsList[i].comment_children = [];
    let date = commentsList[i].comment_date
      .split(' ')
      .join('T')
      .concat('Z');
    commentsList[i].comment_date = new Date(date);
    commentsList[i].comment_depth = getCommentDepth(commentsList[i], commentsList);
    if (getCommentDepth(commentsList[i], commentsList) > maxDepth) {
      maxDepth = getCommentDepth(commentsList[i], commentsList);
    }
  }
  for (let i = maxDepth; i > 0; i--) {
    for (let j = 0; j < commentsList.length; j++) {
      if (commentsList[j].comment_depth == i) {
        for (let k = 0; k < commentsList.length; k++) {
          if (commentsList[j].comment_parent == commentsList[k].comment_ID) {
            commentsList[k].comment_children.push(commentsList[j]);
          }
        }
      }
    }
  }
  for (let i = commentsList.length - 1; i >= 0; i--) {
    if (commentsList[i].comment_parent > 0) {
      commentsList.splice(i, 1);
    }
  }

  return commentsList;
}

export function placeCaretAtEnd(el) {
  el.focus();

  if (
    typeof window.getSelection != 'undefined' &&
    typeof document.createRange != 'undefined'
  ) {
    let range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != 'undefined') {
    let textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

export function placeCaretAtPosition(el, position) {
  el.focus();

  if (
    typeof window.getSelection != 'undefined' &&
    typeof document.createRange != 'undefined'
  ) {
    let range = document.createRange();
    let sel = window.getSelection();
    range.selectNodeContents(el);
    range.setStart(el.childNodes[0], position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != 'undefined') {
    let textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

export function getCaretPosition(editableDiv) {
  let caretPos = 0;
  let sel;
  let range;

  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      let tempEl = document.createElement('span');
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      let tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint('EndToEnd', range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

export function formatUSD(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // if its a whole dollar amount, leave off the .00
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = new Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}

export function truncateText(text, limit) {
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      if (
        text.charAt(i) === ' ' &&
        (text.charAt(i - 1) != ',' ||
          text.charAt(i - 1) != '.' ||
          text.charAt(i - 1) != ';')
      ) {
        return text.substring(0, i) + '...';
      }
    }
    return text.substring(0, limit) + '...';
  } else return text;
}
