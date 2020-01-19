Mobile.Dash = function (params) {
    "use strict";

    var viewModel = {
        title: ko.observable(""),
        versionChecked: ko.observable(false),
        indicatorVisible: ko.observable(false),
        viewShown: function () {
            SetLanguage();

            try
            {
                if (device.platform != "Android") {
                    window.JPush.resetBadge();
                }
            }
            catch(e)
            {}
            

            viewModel.indicatorVisible(true);
            var sessionStorage = window.sessionStorage;
            var u = sessionStorage.getItem("username");
            if (u == null) {
                var view = "Login/0";
                var option = { root: true };
                Mobile.app.navigate(view, option);
                return;
            }

            BindData(this);
        },
        tabOptions:{
            dataSource: [{ text: SysMsg.todo, tid: "1" }, { text: SysMsg.notice, tid: "2" }],
            selectedIndex:0,
            onItemClick: function (e) {
                var $block1 = $("#listDash")[0];
                var $block2 = $("#listNotice")[0];
                if (e.itemData.tid == "1") {
                    $block1.style.display = "block";
                    $block2.style.display = "none";
                }
                else {
                    $block2.style.display = "block";
                    $block1.style.display = "none";
                }

                var scroll = $("#scrollView").dxScrollView("instance");
                scroll.update();
            }
        },
        itemData: new DevExpress.data.DataSource({
                store: [],
                group: function (dataItem) {
                    return dataItem.FUNCDESC;
                }
        }),
        itemDataNotice: new DevExpress.data.DataSource({
            store: []
        }),
        listOptions: {
            dataSource: this.itemData,
            height: "100%",
            grouped: true,
            collapsibleGroups: true,
            onItemClick: function (e) {
                var data = e.itemData;
                var func = data.FUNCID;
                var group = data.GROUPID;
                var doc = data.DOCID;
                OpenDoc(func, group, doc);
            }
        },
        listNoticeOptions:{
            dataSource: this.itemDataNotice,
            height: "100%",
            grouped: false,
            onItemClick: function (e) {
                var data = e.itemData;
                var func = data.FUNCID;
                var group = data.GROUPID;
                var doc = data.DOCID;
                var IDNUM = data.IDNUM;
                var MAILTO = data.MAILTO;
                SetNoticeRead(IDNUM,MAILTO);
                OpenDoc(func, group, doc);
            }
        },
        onScrollViewPullingDown: function (e) {
            BindData(this);
            e.component.release();
        },
    };
    return viewModel;

    function BindData(viewModel) {
        try {
            var sessionStorage = window.sessionStorage;
            var u = sessionStorage.getItem("username");
            var url = $("#WebApiServerURL")[0].value + "/Api/Asapment/GetDashData?UserName=" + u;
            $.ajax({
                type: 'GET',
                url: url,
                cache: false,
                success: function (data, textStatus) {
                    viewModel.itemData.store().clear();

                    for (var i = 0; i < data.length; i++) {
                        viewModel.itemData.store().insert(data[i]);
                    }
                    viewModel.itemData.load();

                    $("#listDash").dxList({
                        dataSource: viewModel.itemData
                    });
                    viewModel.indicatorVisible(false);
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    viewModel.indicatorVisible(false);
                    ServerError(xmlHttpRequest.responseText);
                }
            });

            if (serverVer >= 3)
            {
                var url2 = $("#WebApiServerURL")[0].value + "/Api/Asapment/GetNoticeData?UserName=" + u;
                $.ajax({
                    type: 'GET',
                    url: url2,
                    cache: false,
                    success: function (data, textStatus) {
                        viewModel.itemDataNotice.store().clear();

                        for (var i = 0; i < data.length; i++) {
                            viewModel.itemDataNotice.store().insert(data[i]);
                        }
                        viewModel.itemDataNotice.load();

                        $("#listNotice").dxList({
                            dataSource: viewModel.itemDataNotice
                        });
                    },
                    error: function (xmlHttpRequest, textStatus, errorThrown) {
                        ServerError(xmlHttpRequest.responseText);
                    }
                });
            }
            
        }
        catch (e) {
            DevExpress.ui.notify(e.message, "error", 1000);
        }
    };

    function OpenDoc(func, group, doc) {
        if (func == null || func == "")
        {
            return;
        }

        var view;
        if (doc == "" || doc == null) {
            view = "FormList?FUNCID=" + func + "&GROUPID=" + group;
        }
        else {
            view = "FormEdit?FUNCID=" + func + "&GROUPID=" + group + "&DOCID=" + doc;
        }
        Mobile.app.navigate(view);
    }

    function SetNoticeRead(IDNUM, MAILTO)
    {
        var sessionStorage = window.sessionStorage;
        var u = sessionStorage.getItem("username");
        var url = $("#WebApiServerURL")[0].value + "/Api/Asapment/SetNoticeRead";
        var postData = {
            UserName: u,
            IDNUM: IDNUM,
            MAILTO: MAILTO
        }

        $.ajax({
            type: 'POST',
            url: url,
            data:postData,
            cache: false,
            success: function (data, textStatus) {
                
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                viewModel.indicatorVisible(false);
                ServerError(xmlHttpRequest.responseText);
            }
        });
    }

    function SetLanguage() {
        if (DeviceLang() == "CHS") {
            viewModel.title("待办事项");
        }
        else {
            viewModel.title("To Do List");
        }
    }
};