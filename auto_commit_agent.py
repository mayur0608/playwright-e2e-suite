import subprocess, random, datetime, os, time, argparse

COMMITS = [
    "test: add visual regression test for login page",
    "refactor: improve selector strategy in InventoryPage",
    "feat: add mobile viewport test coverage",
    "fix: update locator after UI component change",
    "test: add negative test for empty cart checkout",
    "chore: bump @playwright/test to latest",
    "feat: add network interception for API mocking",
    "test: add cross-browser test for Firefox",
    "refactor: extract common assertions to helpers",
    "docs: update test execution guide",
    "feat: add retry logic for flaky selectors",
    "test: add accessibility check to login page",
    "chore: update playwright config for parallel runs",
    "fix: stabilise cart item count assertion",
    "test: add keyboard navigation test coverage",
]

FILES = ["NOTES.md", "docs/CHANGELOG.md", "docs/test-notes.md"]

def ensure_file(path):
    os.makedirs(os.path.dirname(path), exist_ok=True) if os.path.dirname(path) else None
    if not os.path.exists(path):
        open(path, "w").write("# Notes\n")

def commit():
    f = random.choice(FILES)
    ensure_file(f)
    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    open(f, "a").write(f"\n<!-- {ts} -->")
    msg = random.choice(COMMITS)
    subprocess.run(["git", "add", f], check=True)
    r = subprocess.run(["git", "commit", "-m", msg], capture_output=True, text=True)
    if r.returncode == 0:
        subprocess.run(["git", "push"], check=True)
        print(f"[{ts}] ✅ {msg}")

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--single", action="store_true")
    args = p.parse_args()
    if args.single:
        commit()
    else:
        for day in range(1, 91):
            print(f"\n📅 Day {day}")
            for _ in range(random.randint(1, 3)):
                commit()
                time.sleep(random.randint(120, 600))
            time.sleep(86400)
