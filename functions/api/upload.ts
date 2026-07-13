export async function onRequestPost(context: any) {
  try {
    const formData = await context.request.formData()
    const file = formData.get('file') as File
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const filename = `${Date.now()}-${file.name}`
    const arrayBuffer = await file.arrayBuffer()

    await context.env.ZYTECH_IMAGES.put(filename, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    })

    // Construct the public URL (you may want to use a custom domain later)
    const url = `https://${context.request.headers.get('host')}/images/${filename}`

    return new Response(JSON.stringify({ url, filename }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
