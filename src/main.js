const $siteList = $('.siteList')
const $last = $siteList.find('li.last')
const sites = JSON.parse(localStorage.getItem('sites'))
const hashMap = sites || [
    { logo: 'B', url: 'https://www.bootcdn.cn/' },
    { logo: 'C', url: 'https://www.caniuse.com/' },
    { logo: 'D', url: 'https://developer.mozilla.org/' },
    { logo: 'F', url: 'https://www.figma.com/' },
    { logo: 'G', url: 'https://github.com/' },
    { logo: 'I', url: 'https://www.iconfont.cn/' },
    { logo: 'J', url: 'https://jquery.com/' },
    { logo: 'V', url: 'https://cn.vuejs.org/' },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('cn.', '').replace('www.', '').replace(/\/.*/, '')
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((item, i) => {
        $(`<li><div class="site">
            <div class="logo">${item.logo}</div>
            <div class="link">${simplifyUrl(item.url)}</div>
            <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div></li>`)
            .insertBefore($last)
            .on('click', () => { location.href = item.url })
            .on('click', '.close', (e) => {
                e.stopPropagation()
                hashMap.splice(i, 1)
                render()
            })
    })
}
render()

$('.addSite').click(() => {
    let url = prompt('请输入想要添加的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({ logo: simplifyUrl(url)[0], url: url })
    console.log(hashMap)
    render()
})

$('.siteList').on('click', '.close', (e) => {
    e.stopPropagation()
    hashMap.splice(index, 1)
    render()
})

window.onbeforeunload = () => {
    const str = JSON.stringify(hashMap)
    localStorage.setItem('sites', str)
}

let isInputting = false
$('.searchForm input')
    .on('focus', () => { isInputting = true })
    .on('blur', () => { isInputting = false })

$(document).on('keypress', (e) => {
    if (!isInputting) {
        const { key } = e
        hashMap.forEach((item) => {
            if (key === item.logo) {
                location.href = item.url
            }
        })
    }
})