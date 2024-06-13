// HTMX Events

document.addEventListener('htmx:beforeRequest', function(event) {
    const target = event.detail.target.id

    // if (target == 'products-archive') {
    // }
})

document.addEventListener('htmx:afterSettle', function(event) {
    // HTML Response
    const target = event.detail.target.id

    // if (target == 'products-archive') {
    // }

    // JSON Response
    let res = event.detail.xhr.responseText

    if (!res.startsWith('{')) return
    res = JSON.parse(res)

    // if (res.data.action === 'add_to_cart') {
    //     if (res.success) {
    //     }
    // }
})