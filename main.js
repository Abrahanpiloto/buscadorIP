const options = {
	method: "GET",
	headers: {
		Authorization: "ApiKey h99o4rdn1d80us74",
		"Content-Type": "application/json",
	},
};

const fetchIpInfo = async (ip) => {
	return fetch(`https://api.ipregistry.co/${ip}`, options)
		.then((res) => res.json())
		.catch((err) => console.error(err));
};

// el signo "$" solamente lo uso para saber que es un elemento del DOM
const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $submit = document.querySelector("#submit");
const $results = document.querySelector("#results");
const $ip = document.querySelector("#ip");
const $continente = document.querySelector("#continente");
const $pais = document.querySelector("#pais");
const $bandera = document.querySelector("#bandera");
const $ciudad = document.querySelector("#ciudad");
const $latitud = document.querySelector("#latitud");
const $longitud = document.querySelector("#longitud");

$form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const { value } = $input;

	if (!value) return;

	$submit.setAttribute("disable", "");
	$submit.setAttribute("aria-busy", "true");

	const ipInfo = await fetchIpInfo(value);

	const ip = ipInfo.ip;
	const continente = ipInfo.location.continent.name;
	const pais = ipInfo.location.country.name;
	const bandera = ipInfo.location.country.flag.emoji;
	const ciudad = ipInfo.location.city;
	const latitud = ipInfo.location.latitude;
	const longitud = ipInfo.location.longitude;

	console.log(ipInfo);

	if (ipInfo) {
		$ip.innerHTML = "IP: " + ip;
		$continente.innerHTML = "Continente: " + continente;
		$pais.innerHTML = "Pais: " + pais;
		$bandera.innerHTML = "Bandera: " + bandera;
		$ciudad.innerHTML = "Ciudad: " + ciudad;
		$latitud.innerHTML = "Latitud: " + latitud;
		$longitud.innerHTML = "Longitud: " + longitud;

		// $results.innerHTML = JSON.stringify(ipInfo, null, 2);
	}

	$submit.removeAttribute("disable");
	$submit.removeAttribute("aria-busy");
});
