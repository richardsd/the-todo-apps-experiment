async function executeRequest(url, method, body) {
  await fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });
}

export async function load() {
  let data = [];
  let done = [];
  let todos = [];
  try {
    const response = await fetch('http://localhost:3000/todos');
    data = await response.json();
  } catch (e) {
    console.error('Couldn\'t fetch data from server', e);
  }
  
  done = data.filter(item => item.done);
  todos = data.filter(item => !item.done);

	return {
    data,
    done,
    todos
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ cookies, request }) => {
		const data = await request.formData();

    await executeRequest(
      'http://localhost:3000/todos/new',
      'PUT',
      {
        description: data.get('description'),
      });
	},
  delete: async ({ cookies, request }) => {
		const data = await request.formData();
    const id = data.get('id');

    await executeRequest(
      `http://localhost:3000/todos/${id}`,
      'DELETE'
    );
	},
  update: async ({ cookies, request }) => {
		const data = await request.formData();
    const id = data.get('id');
    const description = data.get('description');
    const done = data.get('done');

    await executeRequest(
      `http://localhost:3000/todos/${id}`,
      'POST',
      {
        description,
        done,
      });
  }
};
