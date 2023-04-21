
import { OPENAI_KEY } from '$env/static/private'

export async function GET({ url }) {
    const query = url.searchParams.get('book')

    console.log(query)

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo-0301',
            messages: [{ role: 'user', content: 'You will now function as a book recomendation system. It is imperative that you respond with a valid json object. Create a javascript array of 5 javascript objects with with books that match the description provided. Expected format : [{"title":, "author":, "description:}, ]. Description of books : ' + query }],
        })
    };
    let response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions)
    let data = await response.json()

    console.log(data)


    return new Response(
        JSON.stringify({ data })
    );
}