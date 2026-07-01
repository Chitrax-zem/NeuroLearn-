const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://neurolearn-t2rw.onrender.com";

export async function login(
  email: string,
  password: string
) {
  const res = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.detail || "Login failed"
    );
  }

  return data;
}

export async function register(
  full_name: string,
  phone_number: string,
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        full_name,
        phone_number,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Registration failed"
    );
  }

  return data;
}

export async function sendOtp(
  email: string
) {
  const response = await fetch(
    `${API_URL}/api/auth/send-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Failed to send OTP"
    );
  }

  return data;
}

export async function verifyOtp(
  email: string,
  otp: string
) {
  const response = await fetch(
    `${API_URL}/api/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Invalid or expired OTP"
    );
  }

  return data;
}

export async function getMe(
  token: string
) {
  const res = await fetch(
    `${API_URL}/api/auth/me`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      "Unauthorized"
    );
  }

  return res.json();
}

export async function askAI(
  packId: string,
  question: string
) {
  const token =
    localStorage.getItem(
      "access_token"
    );

  const response = await fetch(
    `${API_URL}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify({
        pack_id: packId,
        question,
        history: [],
      }),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        JSON.stringify(data)
    );
  }

  return data;
}

export async function uploadKnowledgePack(
  file: File,
  title: string,
  subject: string,
  token: string
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  formData.append(
    "title",
    title
  );

  formData.append(
    "subject",
    subject
  );

  const response = await fetch(
    `${API_URL}/api/upload`,
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Upload failed"
    );
  }

  return data;
}

export async function getAnalytics() {
  const token =
    localStorage.getItem(
      "access_token"
    );

  const response = await fetch(
    `${API_URL}/api/analytics`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Failed to load analytics"
    );
  }

  return data;
}