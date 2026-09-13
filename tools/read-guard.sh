#!/usr/bin/env bash
# READ GUARD — refuse a whole-file read of a document too large to afford.
#
# WHY THIS EXISTS. A read with `limit` set is deliberate paging and is always
# allowed; so is any file under the budget. It refuses exactly one thing:
# opening a very large file whole, by reflex, when a grep would have answered
# the question. Context volume itself degrades accuracy, so this is a
# correctness guard, not only a cost guard.
set -uo pipefail

MAX_BYTES=${CLAUDE_READ_GUARD_MAX_BYTES:-100000}

payload=$(cat)
path=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
limit=$(printf '%s' "$payload" | jq -r '.tool_input.limit // empty' 2>/dev/null)

[ -n "$limit" ] && exit 0
[ -z "$path" ] || [ ! -f "$path" ] && exit 0

bytes=$(wc -c < "$path" 2>/dev/null || echo 0)
[ "$bytes" -le "$MAX_BYTES" ] && exit 0

tokens=$((bytes / 4))
lines=$(wc -l < "$path" 2>/dev/null || echo 0)

jq -n --arg p "$path" --arg t "$tokens" --arg l "$lines" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: (
      "READ GUARD: `" + $p + "` is " + $l + " lines, about " + $t + " tokens. " +
      "Reading it whole would spend a large part of this session on retrieval. " +
      "Do one of these instead:\n" +
      "  1. grep -n \"<the id or phrase>\" \"" + $p + "\" then read ~50 lines around the hit " +
      "(Read with offset and limit). This is the cheapest and is almost always right.\n" +
      "  2. Read with `limit` set, to page through deliberately. A read with a limit is never blocked.\n" +
      "If you genuinely need the whole file, say so in your reply and page it with limit."
    )
  }
}'
exit 0
