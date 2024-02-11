export async function GET(
  req: Request,
  { params }: { params: { search: string } }
) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  return new Response(params.search)
}
