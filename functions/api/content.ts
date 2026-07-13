import { DEFAULT_CONTENT } from '../../src/app/App'

// Helper to get data from KV
async function getKVContent(env: any) {
  const saved = await env.ZYTECH_DATA.get('content')
  return saved ? JSON.parse(saved) : DEFAULT_CONTENT
}

// Helper to save data to KV
async function saveKVContent(env: any, data: any) {
  await env.ZYTECH_DATA.put('content', JSON.stringify(data))
}

export async function onRequestGet(context: any) {
  try {
    const content = await getKVContent(context.env)
    return new Response(JSON.stringify(content), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function onRequestPut(context: any) {
  try {
    const newContent = await context.request.json()
    await saveKVContent(context.env, newContent)
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to save content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
