# INFO

- This folder contains helpers for "Serverless Functions" that defined in "/api" folder.

- Each file in "/api" folder is a "Serverless Function". For example they can be used as api endpoints. ('localhost:3000/api/passport-as-svg')
- When we deploy project to "Vercel" these Serverless Functions also get automatically uploaded.
- By default when we push commit changes to GitHub, Automatic build process happen.

  - But we can manually deploy current project using "npm run vercel-deploy-folder", without making a commit/push.
  - In addition we can check things out locally by just running local vercel server by running "npm run vercel-dev-server"

---

- On Vercel Dashboard, Keep in mind to fill/check belows,
  - Command that need to run on CI/CI Build Process. Check "Build & Development Settings" Section.
  - Add relevant Environment Variable in "Environment Variables" Section.
