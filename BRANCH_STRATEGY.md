# Branch Strategy & PR Automation

Disciplined git workflow for KIO Studio development.

## Branch Structure

### `main`
- **Purpose**: Production-ready code
- **Protection**: All PRs require automated checks + review
- **Merge from**: `design` branch (via PR with automation)
- **Deployment**: Main branch deploys to production

### `design`
- **Purpose**: Design-focused development, pixel-perfect Figma implementation
- **Protection**: Automated quality checks (TypeScript, ESLint, Build)
- **Merge to**: `main` (via PR)
- **Scope**: UI/UX improvements, design tokens, component refinements, Figma spec compliance

### Feature/Task Branches
- Created from: `design` branch
- Naming: `design/feature-name` (kebab-case)
- Merge to: `design` (via PR with automation)
- Scope: Individual features or design improvements

## PR Automation

### Automated Checks (All PRs)

Every PR to `main` or `design` automatically runs:

1. **Quality Checks**
   - TypeScript strict mode (`npm run typecheck`)
   - ESLint with accessibility rules (`npm run lint`)
   - Production build (`npm run build`)

2. **Design Compliance**
   - Validates `tokens/tokens.json` structure
   - Checks design documentation presence
   - Verifies DESIGN.md updates

3. **Automated Comments**
   - Comments on PR with check results
   - ✅ Pass/fail status for each check
   - Links to relevant documentation

### Manual Review Requirements

- **For `main` branch**: 
  - Code review approval required (automated checks must pass)
  - Design compliance verified

- **For `design` branch**:
  - Automated checks must pass
  - Design spec compliance verified

## Workflow Examples

### Adding a Design Feature

```bash
# 1. Create feature branch from design
git checkout design
git pull origin design
git checkout -b design/new-component

# 2. Make changes
# ... implement design spec ...

# 3. Commit and push
git add .
git commit -m "feat: implement new component to Figma spec"
git push -u origin design/new-component

# 4. Create PR to design (automation runs)
gh pr create --base design

# 5. Once approved and checks pass, merge to design
# 6. Later, create PR from design to main for release
```

### Merging to Production

```bash
# 1. Create PR from design to main
git checkout main
git pull origin main
git checkout -b release/yyyy-mm-dd
git merge design
git push -u origin release/yyyy-mm-dd

# 2. Create PR (automation validates everything)
gh pr create --base main

# 3. After review and approval, merge to main
# 4. Main is now ready for deployment
```

## Discipline Rules

1. **Always work from latest**: `git pull origin <branch>` before starting
2. **Figma spec is law**: Pixel-perfect implementation (see DESIGN.md)
3. **No force pushes**: Avoid `--force` unless absolutely necessary
4. **Small, focused commits**: One logical change per commit
5. **Descriptive commit messages**: Follow conventional commits (feat, fix, chore, etc.)
6. **Automated checks must pass**: Never merge with failing checks
7. **Design tokens first**: Update `tokens/tokens.json` before hardcoding values

## Status

✅ Workflow established  
✅ Automated PR review active  
✅ `main` branch protected  
✅ `design` branch ready for disciplined design work
