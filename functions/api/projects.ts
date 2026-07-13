async function getKVProjects(env: any) {
  const saved = await env.ZYTECH_DATA.get('projects')
  return saved ? JSON.parse(saved) : []
}

async function saveKVProjects(env: any, data: any[]) {
  await env.ZYTECH_DATA.put('projects', JSON.stringify(data))
}

export async function onRequestGet(context: any) {
  try {
    const projects = await getKVProjects(context.env)
    return new Response(JSON.stringify(projects), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch projects' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function onRequestPut(context: any) {
  try {
    const newProjects = await context.request.json()
    await saveKVProjects(context.env, newProjects)
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to save projects' }), {
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
