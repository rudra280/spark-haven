// Professional OAuth Integration for Google and GitHub

export class OAuthService {
  private static instance: OAuthService;

  public static getInstance(): OAuthService {
    if (!OAuthService.instance) {
      OAuthService.instance = new OAuthService();
    }
    return OAuthService.instance;
  }

  // Google OAuth Integration
  async signInWithGoogle(): Promise<{
    success: boolean;
    user?: any;
    error?: string;
  }> {
    try {
      // For production, you would use Google OAuth API
      // For demo, we'll simulate the OAuth flow

      return new Promise((resolve) => {
        // Simulate OAuth popup window
        const popup = window.open(
          "about:blank",
          "google-oauth",
          "width=500,height=600,scrollbars=yes,resizable=yes",
        );

        if (popup) {
          popup.document.write(`
            <html>
              <head>
                <title>Sign in with Google</title>
                <style>
                  body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    padding: 40px 20px;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                  .container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                    text-align: center;
                    max-width: 400px;
                  }
                  .google-logo {
                    width: 40px;
                    height: 40px;
                    margin: 0 auto 20px;
                  }
                  h2 { color: #333; margin-bottom: 20px; }
                  p { color: #666; margin-bottom: 30px; }
                  button {
                    background: #4285f4;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 10px;
                    transition: background-color 0.3s;
                  }
                  button:hover { background: #3367d6; }
                  .cancel { background: #6c757d; }
                  .cancel:hover { background: #5a6268; }
                  .loading {
                    display: none;
                    margin-top: 20px;
                  }
                  .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #4285f4;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                  }
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="google-logo">🔑</div>
                  <h2>Sign in with Google</h2>
                  <p>Choose an account to continue to LEARNVERSE</p>
                  
                  <div id="accounts">
                    <button onclick="selectAccount('demo.student@gmail.com', 'Demo Student')">
                      <strong>Demo Student</strong><br>
                      <small>demo.student@gmail.com</small>
                    </button><br>
                    
                    <button onclick="selectAccount('jane.learner@gmail.com', 'Jane Learner')">
                      <strong>Jane Learner</strong><br>
                      <small>jane.learner@gmail.com</small>
                    </button><br>
                    
                    <button onclick="selectAccount('test.user@gmail.com', 'Test User')">
                      <strong>Test User</strong><br>
                      <small>test.user@gmail.com</small>
                    </button><br>
                    
                    <button class="cancel" onclick="window.close()">Cancel</button>
                  </div>
                  
                  <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p>Signing you in...</p>
                  </div>
                </div>
                
                <script>
                  function selectAccount(email, name) {
                    document.getElementById('accounts').style.display = 'none';
                    document.getElementById('loading').style.display = 'block';
                    
                    setTimeout(() => {
                      window.opener.postMessage({
                        type: 'GOOGLE_AUTH_SUCCESS',
                        user: {
                          email: email,
                          name: name,
                          provider: 'google',
                          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
                        }
                      }, '*');
                      window.close();
                    }, 2000);
                  }
                </script>
              </body>
            </html>
          `);
        }

        // Listen for the OAuth response
        const messageHandler = (event: MessageEvent) => {
          if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
            window.removeEventListener("message", messageHandler);

            const user = {
              id: this.generateId(),
              name: event.data.user.name,
              email: event.data.user.email,
              plan: "free",
              avatar: event.data.user.avatar,
              verified: true,
              provider: "google",
              createdAt: new Date().toISOString(),
              profile: {
                bio: `Learning enthusiast using LEARNVERSE`,
                location: "Global",
                website: "",
                skills: ["Online Learning", "Self Development"],
                achievements: ["Quick Learner"],
                totalWatchTime: 0,
                coursesCompleted: 0,
                certificates: 0,
              },
              subscription: {
                plan: "free",
                status: "active",
                validUntil: null,
              },
            };

            // Save user data
            const token = this.generateToken(user);
            localStorage.setItem("auth_token", token);
            localStorage.setItem("current_user", JSON.stringify(user));

            resolve({ success: true, user });
          }
        };

        window.addEventListener("message", messageHandler);

        // Handle popup close without selection
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            window.removeEventListener("message", messageHandler);
            resolve({ success: false, error: "OAuth cancelled" });
          }
        }, 1000);
      });
    } catch (error) {
      return { success: false, error: "Google OAuth failed" };
    }
  }

  // GitHub OAuth Integration
  async signInWithGitHub(): Promise<{
    success: boolean;
    user?: any;
    error?: string;
  }> {
    try {
      return new Promise((resolve) => {
        const popup = window.open(
          "about:blank",
          "github-oauth",
          "width=500,height=600,scrollbars=yes,resizable=yes",
        );

        if (popup) {
          popup.document.write(`
            <html>
              <head>
                <title>Sign in with GitHub</title>
                <style>
                  body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #24292e 0%, #1a1a1a 100%);
                    margin: 0;
                    padding: 40px 20px;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                  }
                  .container {
                    background: #2d3748;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                    text-align: center;
                    max-width: 400px;
                    border: 1px solid #4a5568;
                  }
                  .github-logo {
                    width: 40px;
                    height: 40px;
                    margin: 0 auto 20px;
                    font-size: 40px;
                  }
                  h2 { color: white; margin-bottom: 20px; }
                  p { color: #a0aec0; margin-bottom: 30px; }
                  button {
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 10px;
                    transition: background-color 0.3s;
                    width: 100%;
                    max-width: 300px;
                  }
                  button:hover { background: #218838; }
                  .cancel { background: #6c757d; }
                  .cancel:hover { background: #5a6268; }
                  .loading {
                    display: none;
                    margin-top: 20px;
                  }
                  .spinner {
                    border: 4px solid #4a5568;
                    border-top: 4px solid #28a745;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                  }
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  .account {
                    background: #1a202c;
                    border: 1px solid #4a5568;
                    margin: 10px 0;
                    padding: 15px;
                    border-radius: 8px;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="github-logo">🐙</div>
                  <h2>Sign in with GitHub</h2>
                  <p>Choose an account to continue to LEARNVERSE</p>
                  
                  <div id="accounts">
                    <div class="account">
                      <button onclick="selectAccount('developer.demo@github.io', 'Developer Demo')">
                        <strong>Developer Demo</strong><br>
                        <small>developer.demo@github.io</small>
                      </button>
                    </div>
                    
                    <div class="account">
                      <button onclick="selectAccount('code.student@github.io', 'Code Student')">
                        <strong>Code Student</strong><br>
                        <small>code.student@github.io</small>
                      </button>
                    </div>
                    
                    <div class="account">
                      <button onclick="selectAccount('tech.learner@github.io', 'Tech Learner')">
                        <strong>Tech Learner</strong><br>
                        <small>tech.learner@github.io</small>
                      </button>
                    </div>
                    
                    <button class="cancel" onclick="window.close()">Cancel</button>
                  </div>
                  
                  <div class="loading" id="loading">
                    <div class="spinner"></div>
                    <p>Authenticating with GitHub...</p>
                  </div>
                </div>
                
                <script>
                  function selectAccount(email, name) {
                    document.getElementById('accounts').style.display = 'none';
                    document.getElementById('loading').style.display = 'block';
                    
                    setTimeout(() => {
                      window.opener.postMessage({
                        type: 'GITHUB_AUTH_SUCCESS',
                        user: {
                          email: email,
                          name: name,
                          provider: 'github',
                          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
                        }
                      }, '*');
                      window.close();
                    }, 2000);
                  }
                </script>
              </body>
            </html>
          `);
        }

        const messageHandler = (event: MessageEvent) => {
          if (event.data.type === "GITHUB_AUTH_SUCCESS") {
            window.removeEventListener("message", messageHandler);

            const user = {
              id: this.generateId(),
              name: event.data.user.name,
              email: event.data.user.email,
              plan: "free",
              avatar: event.data.user.avatar,
              verified: true,
              provider: "github",
              createdAt: new Date().toISOString(),
              profile: {
                bio: `Developer learning with LEARNVERSE`,
                location: "Global",
                website: "https://github.com",
                skills: ["Programming", "Development", "Open Source"],
                achievements: ["GitHub User", "Code Enthusiast"],
                totalWatchTime: 0,
                coursesCompleted: 0,
                certificates: 0,
              },
              subscription: {
                plan: "free",
                status: "active",
                validUntil: null,
              },
            };

            const token = this.generateToken(user);
            localStorage.setItem("auth_token", token);
            localStorage.setItem("current_user", JSON.stringify(user));

            resolve({ success: true, user });
          }
        };

        window.addEventListener("message", messageHandler);

        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            window.removeEventListener("message", messageHandler);
            resolve({ success: false, error: "GitHub OAuth cancelled" });
          }
        }, 1000);
      });
    } catch (error) {
      return { success: false, error: "GitHub OAuth failed" };
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateToken(user: any): string {
    const header = btoa(JSON.stringify({ typ: "JWT", alg: "HS256" }));
    const payload = btoa(
      JSON.stringify({
        sub: user.id,
        email: user.email,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      }),
    );
    const signature = btoa("signature");
    return `${header}.${payload}.${signature}`;
  }
}

export const oauthService = OAuthService.getInstance();
