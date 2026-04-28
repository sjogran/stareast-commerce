import http from "k6/http";
import { check } from "k6";

const baseUrl = __ENV.BASE_URL || "http://localhost:3000";

export const options = {
  stages: [
    { duration: "5s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "5s", target: 0 }
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"]
  }
};

export default function () {
  const payload = JSON.stringify({
    email: "alice@example.com",
    password: "alice123"
  });

  const params = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const response = http.post(`${baseUrl}/api/login`, payload, params);

  check(response, {
    "status is 200": (r) => r.status === 200,
    "token exists": (r) => {
      try {
        const body = JSON.parse(r.body);
        return typeof body.token === "string" && body.token.length > 0;
      } catch (error) {
        return false;
      }
    }
  });
}
