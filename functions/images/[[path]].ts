export async function onRequestGet(context: any) {
  try {
    const path = context.params.path
    if (!path) {
      return new Response('Not found', { status: 404 })
    }

    const obj = await context.env.ZYTECH_IMAGES.get(path)
    if (!obj) {
      return new Response('Not found', { status: 404 })
    }

    const headers = new Headers()
    obj.writeHttpMetadata(headers)
    headers.set('etag', obj.httpEtag)
    headers.set('Cache-Control', 'public, max-age=31536000')

    return new Response(obj.body, { headers })
  } catch (e) {
    return new Response('Failed to fetch image', { status: 500 })
  }
}
