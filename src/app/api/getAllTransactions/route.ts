export const runtime = 'edge';

export async function GET(): Promise<Response> {
  const apiUrl = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-luvcj/endpoint/data/v1/action/find';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': process.env.MONGODB_DATA_API_KEY!,
      },
      body: JSON.stringify({
        collection: 'DailyTransaction',
        database: 'budgetDatabase',
        dataSource: 'Cluster0',
        filter: {},
        sort: { _id: -1 }, // Sort by most recent first
      }),
    });

    // Log the response status
    console.log('Response status:', response.status);

    // Parse the raw response text
    const responseText = await response.text();

    let result: any;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      return new Response(
        JSON.stringify({
          error: 'Failed to parse response',
          rawResponse: responseText,
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate the result structure
    if (!result || !result.documents) {
      return new Response(
        JSON.stringify({
          error: 'No documents found',
          fullResponse: result,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return the documents
    return new Response(JSON.stringify(result.documents), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch transactions',
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
