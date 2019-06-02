// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()
    $('#datanum').hide()

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var pageNum = n / 20
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('id', 'front').text('上一頁')
        $lli = $('<li>').attr('class', 'page-item').append($la)
        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').attr('id', 'num').text(i)

            var nowpage = 1

            $('#nowpage').empty()

            $a.on('click', function() {
                var i = $(this).text()
                showItems(Number(i))
                nowpage = Number(i)
                $('#nowpage').empty()
                $p = $('<p>').attr('id', 'nowpagenum').text('>' + '當前頁面 : 第' + nowpage + '頁' + '<')
                $('#nowpage').append($p)
                $('#nowpage').show()
                return nowpage

            })

            $li = $('<li>').attr('class', 'page-item').append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link next').attr('id', 'next').attr('href', '#').text('下一頁')
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)

        //隔頁功能，同時加入當前頁面顯示
        $('#next').on('click', function() {
            $('#nowpage').empty()
            if (nowpage == 1) {
                showItems(2)
                nowpage += 1
                $p = $('<p>').attr('id', 'nowpagenum').text('>' + '當前頁面 : 第' + nowpage + '頁' + '<')
                $('#nowpage').append($p)
                $('#nowpage').show()
                return nowpage
            } else if (nowpage == 9) {
                console.log('9')
                showItems(9)
                $p = $('<p>').attr('id', 'nowpagenum').text('>' + '當前頁面 : 第' + nowpage + '頁' + '<')
                $('#nowpage').append($p)
                $('#nowpage').show()
                alert('這是最後一頁喔!')
            } else {
                showItems(nowpage + 1)
                nowpage += 1
                $p = $('<p>').attr('id', 'nowpagenum').text('>' + '當前頁面 : 第' + nowpage + '頁' + '<')
                $('#nowpage').append($p)
                $('#nowpage').show()
                return nowpage
            }
        })
        $('#front').on('click', function() {
            $('#nowpage').empty()
            if (nowpage == 1) {
                showItems(1)
                $p = $('<p>').attr('id', 'nowpagenum').text('>' + '當前頁面 : 第' + '1' + '頁' + '<')
                $('#nowpage').append($p)
                $('#nowpage').show()
                alert('這是第一頁喔!')
            } else {
                showItems(nowpage - 1)
                nowpage -= 1
                $p = $('<p>').attr('id', 'nowpagenum').text('>' + '當前頁面 : 第' + nowpage + '頁' + '<')
                $('#nowpage').append($p)
                $('#nowpage').show()
                return nowpage
            }
        })
    }

    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B06602022/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();

                    // 資料庫有回傳資料
                    items = response.items

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                    //資料數量
                    $('#datanum').empty()
                    $icon = $('<i>').attr('class', 'fas fa-angle-double-right')
                    $olli = $('<li>').attr('class', 'breadcrumb-item active').attr('aria-current', 'page').text('>  搜尋到 ' + items.length + ' 筆資料  <')
                    $ol = $('<ol>').attr('class', 'breadcrumb').append($olli)
                    $nav = $('<nav>').attr('aria-label', 'breadcrumb').append($ol)
                    $('#datanum').append($nav)
                    $('#datanum').show()


                    //當前頁面顯示第一頁
                    $('#nowpage').empty()
                    $p = $('<p>').text('>' + '當前頁面 : 第' + '1' + '頁' + '<')
                    $('#nowpage').append($p)
                    $('#nowpage').show()

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

})