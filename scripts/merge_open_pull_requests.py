#!/usr/bin/env python3
from __future__ import print_function
import json
import os
import subprocess
import urllib.request


def get_pulls():
    url = f"https://api.github.com/repos/{os.environ['GITHUB_REPOSITORY']}/pulls"
    request = urllib.request.Request(url, method="GET")
    request.add_header("Accept", "application/vnd.github.v3+json")
    data = urllib.request.urlopen(request).read()
    return json.loads(data)


pulls = get_pulls()

subprocess.run(
    ["git", "config", "pull.rebase", "false"],
    check=True,
)
subprocess.run(
    ["git", "config", "user.email", "auto-merge-bot@kitspace.dev"],
    check=True,
)
subprocess.run(
    ["git", "config", "user.name", "Kitspace Auto-Merge Bot"],
    check=True,
)

for pull in pulls:
    if not pull["draft"]:
        subprocess.run(
            ["git", "pull", pull["head"]["repo"]["clone_url"], pull["head"]["ref"]],
            check=True,
        )
