
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
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'You will now function as a book recomendation system. It is imperative that you respond with a valid json array. Create a javascript array of 5 javasript objects of books that match the description provided as well as possible. Expected format (t=title, a=author) : [{t:, a: }]. Output : ' + query }],
        })
    };
    let response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions)
    let data = await response.json()

    // console.log(data)


    return new Response(
        JSON.stringify({ data })
    );
}