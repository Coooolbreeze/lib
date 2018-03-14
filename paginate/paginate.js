function paginate() {
    var element, page, limit, count, totalButton, totalPage, callback;

    function run(params) {
        if (params != true) {
            init(params);
        }
        fetchDom();
        bindEvent();
    }

    return run;

    function init(params) {
        element = params.element ? params.element : '#paginate';
        page = params.page ? params.page : 1;
        limit = params.limit ? params.limit : 10;
        count = params.count;
        totalButton = params.totalButton ? params.totalButton : 7;
        totalPage = Math.ceil(count / limit);
        callback = params.callback;
    }

    function fetchDom() {
        var beginPage = page - Math.ceil((totalButton - 3) / 2);
        if (beginPage > totalPage - totalButton)
            beginPage = totalPage - totalButton + 1;
        if (beginPage <= 1)
            beginPage = 1;

        var first = '<ul class="paginate"><li class="paginate-first"><a href="javascript:;">首页</a></li>',
            prev = '<li class="paginate-prev"><a href="javascript:;">上一页</a></li>',
            leftButton = '',
            ellip = '',
            rightButton = '',
            next = '<li class="paginate-next"><a href="javascript:;">下一页</a></li>',
            last = '<li class="paginate-last"><a href="javascript:;">尾页</a></li>',
            statistics = '<span>共' + count + '条记录，共' + totalPage + '页</span></ul>';
        var forCount = totalPage > totalButton ? totalButton : totalPage;

        if (totalPage - beginPage >= totalButton) {
            ellip = '<li><a href="javascript:;">...</a></li>';
            rightNum = totalButton + beginPage + 2;
            rightNum = rightNum >= totalPage ? totalPage : rightNum;
            rightButton = '<li class="paginate-button"><a href="javascript:;">' + rightNum + '</a></li>';
            forCount = totalButton - 2;
        }

        for (var i = 0; i < forCount; i++) {
            var pageNum = i + beginPage;
            if (pageNum == page) {
                leftButton += '<li class="paginate-button active"><a href="javascript:;">' + pageNum + '</a></li>';
                continue;
            }
            leftButton += '<li class="paginate-button"><a href="javascript:;">' + pageNum + '</a></li>';
        }

        $(element).html(first + prev + leftButton + ellip + rightButton + next + last + statistics);
    }

    function bindEvent() {
        $(element + ' .paginate-button').on('click', function () {
            if (page != $(this).children().text()) {
                page = $(this).children().text();
                callback(page);
            }
        });
        $(element + ' .paginate-prev').on('click', function () {
            if (page > 1) {
                page--;
                callback(page);
            }
        });
        $(element + ' .paginate-next').on('click', function () {
            if (page < totalPage) {
                page++;
                callback(page);
            }
        });
        $(element + ' .paginate-first').on('click', function () {
            if (page != 1) {
                page = 1;
                callback(page);
            }
        });
        $(element + ' .paginate-last').on('click', function () {
            if (page != totalPage) {
                page = totalPage;
                callback(page);
            }
        });
    }
};