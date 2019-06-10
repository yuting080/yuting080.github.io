$('.difbtn').on('click', start);

function start() {

    // 隱藏選擇介面
    $('#opt').hide()
    $('.jumbotron').hide()

    // 依據選擇的難度分配碟片層數
    var Count = $(this).data('layers');

    // 加入碟片層數到遊玩介面
    for (var i = 1; i <= Count; i++) {
        $layer = $('<div>').attr('class', 'disc layer' + i).attr('data-layer', i)
            //在第一個柱子加上對應層數
        $('#col1').append($layer);
    }
    // 顯示遊玩介面
    $('#scoreboard').fadeTo(600, 1);
    $('.column').fadeTo(600, 1);

    // 設置移動步數初始值
    $('#gameBoard').data('score', 0);
}


$('.column').on('click', select);

function select() {

    // 點選的柱子
    var $thisColumn = $(this);
    // 尋找被選中的柱子其中的所有碟片
    var $selectedColumns = $('#gameBoard').find('.column.selected');
    // 指定最上層碟片(若有)
    var $selectedColumn = ($selectedColumns.length > 0) ? $($selectedColumns.get(0)) : false;

    // 將選到的碟片抬高(配合css)
    if (!$selectedColumn) {
        $thisColumn.addClass('selected');
        return;
    }
    // 下降碟片(配合css)
    if ($selectedColumn.attr('id') == $thisColumn.attr('id')) {
        $thisColumn.removeClass('selected');
        return;
    }

    // 檢測符合規則後，開始移動碟片
    if (_validMove($selectedColumn, $thisColumn)) {

        // 取得選擇的碟片並將其從原本的柱子刪除
        var $disc = $($selectedColumn.children('.disc').get(0)).detach();

        // 將選擇的碟片加入慾選的柱子
        $thisColumn.prepend($disc);

        // 下降碟片(配合css)
        $selectedColumn.removeClass('selected');

        // 執行步數計算與檢測機制
        incrementCounter();
        _checkWin();
    }
}

// 遊戲規則
function _validMove($from, $to) {

    // 判斷欲移動的柱子位置是否有碟片存在
    if ($from.children('.disc').length == 0) return false;

    // 判斷欲移動到的位置是否有碟片存在
    if ($to.children('.disc').length == 0) return true;

    // 取得欲移動柱子上的第一片
    var $topOfFrom = $($from.children('.disc').get(0));

    // 取得欲移動到柱子上的第一片
    var $topOfTo = $($to.children('.disc').get(0));

    // 檢查欲移動到柱子上的第一片是否大於欲移動的碟片
    return +$topOfTo.data('layer') > +$topOfFrom.data('layer');
}

// 遊戲結束檢查機制
function _checkWin() {

    // 第一跟第二柱上碟片都已被清空
    if ($('#col1').children('.disc').length == 0 && $('#col2').children('.disc').length == 0) {

        // 遊戲介面消失
        $('.column').hide();
        $('#scoreboard').hide();

        // 遊戲完成~
        $('#win').fadeTo(600, 1)
    }
}

// 步數計算器
function incrementCounter() {

    // 當碟片移動成宮則將步數加
    var score = $('#gameBoard').data('score') + 1;

    // 將步數記錄下來
    $('#gameBoard').data('score', score);

    // 顯示當前步數
    $('.score-display').text(score);
}