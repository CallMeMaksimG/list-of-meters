export class HttpError extends Error {
    status: number;
    text: string;
    constructor(message: string, status: number, text: string) {
        super(message);
        this.status = status;
        this.text = text;
    }
}

export async function request(url: string | URL | Request, options: RequestInit | undefined) {
    try {
        const response = await fetch(url, options);

        if (response.status < 200 || response.status >= 400) {
            throw new HttpError('Status exc', response.status, await response.text());
        }
        const data = await response.json();
        return data;


    } catch (error) {
        console.dir(error);
        throw error;
    }
}