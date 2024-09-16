import * as jose from "jose";

const secret = "secret";
const algo = "HS512";

const secretBytes = new TextEncoder().encode(secret);
export const secretB64 = btoa(
  Array.from(secretBytes, (x) => String.fromCodePoint(x)).join("")
);

export const createJWT = async () => {
  return await new jose.SignJWT({
    claims: {
      userId: "ridho",
    },
  })
    .setProtectedHeader({ alg: algo })
    .setAudience("urn:audience")
    .setIssuer("urn:issuer")
    .setSubject("urn:subject")
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(secretBytes);
};
