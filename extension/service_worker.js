chrome.action.onClicked.addListener(() => {

    chrome.storage.local.get({ 'address': '' })

        .then((storedData) => {

            if (storedData.address === '') {
                chrome.runtime.openOptionsPage();
                return;
            }

            chrome.tabs.query({ url: `${storedData.address}*` })

                .then((targetUrlTabs) => {
                    if (!Array.isArray(targetUrlTabs) || !targetUrlTabs.length) {
                        chrome.tabs.create({ url: storedData.address });
                        return;
                    }
                    chrome.tabs.update(targetUrlTabs[0].id, { active: true });
                })

                .catch((err) => console.error(err));

        })

        .catch((err) => console.error(err));

});
