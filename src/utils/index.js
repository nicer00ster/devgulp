import {destroyCookie, parseCookies, setCookie} from 'nookies';

export function verifyToken(token) {
    const cookies = parseCookies();
    return cookies[token];
}

export function setToken(token) {
    setCookie({}, '_app', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });
}

export function deleteToken() {
    destroyCookie({}, '_app');
}

export function getTaxonomyIcon(taxonomy) {
    switch (taxonomy) {
        case 'JavaScript':
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
        commentsList[i].comment_depth = getCommentDepth(
            commentsList[i],
            commentsList,
        );
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
