const formEl = document.querySelector('form');

formEl.addEventListener('submit', async (e) => {
	e.preventDefault();
	console.log(e);

	const data = new FormData(formEl);
	const newUser = {};
	for (const [key, value] of data) {
		newUser[key] = value;
	}

	const response = await fetch('/api/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newUser)
	});
	if (response.ok) {
		window.location.href = '/';
	} else {
		alert(response.statusText);
	}
});