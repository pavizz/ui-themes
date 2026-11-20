import { test, expect } from 'claude-code/testing'

// A tree of type 'engine' is Claude Code's own rendering of the message.
async function renderMessage($: any, surface: string, component: string, props: object) {
  return (await $.ui.render({ surface, component, requestId: 'm1', props } as any)) as { type?: string }
}

const REPLY = { text: '**bold**', isFirstOfReply: true }
const PROMPT = { text: 'hello' }

for (const surface of ['desktop', 'vscode', 'mobile']) {
  test(`reply keeps the default rendering on ${surface}`, async $ => {
    expect((await renderMessage($, surface, 'AssistantMessage', REPLY)).type).toBe('engine')
  })

  test(`prompt keeps the default rendering on ${surface}`, async $ => {
    expect((await renderMessage($, surface, 'UserMessage', PROMPT)).type).toBe('engine')
  })
}

test('reply is boxed in the terminal', async $ => {
  expect((await renderMessage($, 'terminal', 'AssistantMessage', REPLY)).type).not.toBe('engine')
})

test('prompt is boxed in the terminal', async $ => {
  expect((await renderMessage($, 'terminal', 'UserMessage', PROMPT)).type).not.toBe('engine')
})
