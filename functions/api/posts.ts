async function getKVPosts(env: any) {
  const saved = await env.ZYTECH_DATA.get('posts')
  return saved ? JSON.parse(saved) : []
}

async function saveKVPosts(env: any, data: any[]) {
  await env.ZYTECH_DATA.put('posts', JSON.stringify(data))
}

export async function onRequestGet(context: any) {
  try {
    const posts = await getKVPosts(context.env)
    return new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function onRequestPut(context: any) {
  try {
    const newPosts = await context.request.json()
    await saveKVPosts(context.env, newPosts)
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to save posts' }), {
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
