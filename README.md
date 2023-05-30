# Roadoxe

Roadoxe is a project developed to practice good coding conventions and test-driven development (TDD). It is built with
TypeScript and Express.js.

## Prerequisites

Make sure you have the following software installed:

- Node.js >= 18.15.0
- npm >= 9.6.1
- pnpm >= 8.5.1
- postgres >= 15.1

** Please note this is mono-repo and we handle workspaces using nx and pnpm **

** Running `pnpm install` in the root will install dependencies for all the apps and packages **

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RoadOxe/Roadoxe.git
```

2. Navigate to the project directory:

```bash
cd Roadoxe
```

3. Install the dependencies using pnpm:

```bash
pnpm install
```

4. Setup Database using pnpm:

```bash
pnpm ts-node src/scripts/migrations/create-database.ts
```

## Usage

To start the development server:

```bash
pnpm start:dev
```

To build the project:

```bash
pnpm build
```

To run the tests:

```bash
pnpm test
```

## Coding Conventions

To maintain a consistent code style and ensure code quality, the following conventions are followed in this project:

- **Linting**: ESLint is used for linting the TypeScript code. You can run the linting checks using the following
  command:

  ```bash
  pnpm lint
  ```

- **Formatting**: Prettier is used for code formatting. You can format the code using the following command:

  ```bash
  pnpm format
  ```

- **Commit Messages**: The project enforces a commit message format using commitlint. Commit messages should follow the
  format: `<verb in imperative mood>: <what was done>`. Allowed verbs in imperative mood include `feat`, `fix`, `bump`
  , `chore`, `refactor`, `reformat`, `optimise`, `document`, `merge`. Example: `feat: add login button`.

- **Git Hooks**: Husky is used to set up Git hooks for pre-commit and pre-push actions. These hooks ensure that the code
  is properly formatted, linted, and follows the commit message conventions before committing or pushing to the
  repository.
  ...

For detailed coding conventions, please refer to the [CODING_CONVENTIONS.md](CODING_CONVENTIONS.md) file.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
