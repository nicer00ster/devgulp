import { setCookie, destroyCookie, parseCookies } from "nookies";

export function verifyToken(token) {
  const cookies = parseCookies();
  return cookies[token];
}

export function setToken(token) {
  setCookie({}, "_app", token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/"
  });
}

export function deleteToken() {
  destroyCookie({}, "_app");
}

export function getTaxonomyIcon(taxonomy) {
  switch (taxonomy) {
    case "JavaScript":
      return "fab fa-js-square";
    case "Python":
      return "fab fa-python";
    case "React":
      return "fab fa-react";
    case "PHP":
      return "fab fa-php";
    case "Java":
      return "fab fa-java";
    default:
      return;
  }
}
