var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
const ul = document.getElementById('mostStars');
const url = 'https://api.github.com/search/repositories?q=language:javascript+created:>2017-12-12&per_page=3&sort=stars';
fetch(url)
 .then(function(resp) {
    return resp.json()
  })
 .then(function(data) {
	data.items.forEach(function(item) {
	let dt = new Date(item.created_at)
	let dd = ordinal_suffix_of(dt.getDate())
	let mm = monthNames[dt.getMonth()] 
	let yyyy = dt.getFullYear()
	ul.innerHTML +=`
	<div>
		<p>
			<a href="${item.html_url}">${item.html_url}</a>
		</p>
		<p>
			${item.description}
		</p>
		<p>
		<span class="date">Created ${dd}${mm}${yyyy}</span> <span class="stars"><img src="img/smallStar.png"> ${item.stargazers_count}</span>
	</div>
`
	})
   })
 .catch(function(err) {
          ul.innerHTML += 'Github did a silly<br>';
          ul.innerHTML += err;
        })