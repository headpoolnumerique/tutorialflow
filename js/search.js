$(document).ready(function () {
    let all_tags = [];
    let unique_tags = [];
    $.get("./devjs/out.json", function (data) {
        $("#main").html = "<li>test</li>";
        data.forEach(function (d) {
            try {
                if (d.tags !== undefined)
                    all_tags += d.tags.replace(/\s/g,'') + "," // remove whitespace (just in case ;)
            } catch {
                console.log("no tags")
            }
        });
       
        all_tags = all_tags.split(",").filter(item => item); // remove empty entries from array with filter
        unique_tags = all_tags.filter(onlyUnique);
        
        let docFrag = document.createDocumentFragment();

        unique_tags.forEach(function (filter_text) {
            let filter_button = document.createElement("button");
            filter_button.setAttribute('text', filter_text);
            filter_button.setAttribute('class', "filter_button");
            filter_button.innerHTML = filter_text;
            docFrag.appendChild(filter_button);
        });

        $("#main").append(docFrag);
        // count how many tags are inside all_tags array
        let counts = {};
        all_tags.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        //console.log(counts)
        $(".filter_button").on("click", function () {
            $(this).toggleClass("active");
            updateResults(data);
        })
    })
});

function updateResults(data) {
    let active_ones = document.querySelectorAll(".active");
    let active_tags = []
    
    active_ones.forEach(function (tag) {
        active_tags.push($(tag).text());
    })

    // compares two arrays and returns only elements that is part of both arrays
    const filterArray = (arr1, arr2) => {
        const filtered = arr1.filter(el => {
            return arr2.indexOf(el) !== -1;
        });
        return filtered;
    };

    const filterTags = d => {
        if (d.tags != undefined) {
            // get tags from yaml header and then compare to array with active filter buttons
            let tags_array = d.tags.replace(/\s/g,'').split(",")
            const newarr =filterArray(tags_array, active_tags);
            if (newarr.length > 0) return d;    
        }
    }

    const data_matching = data.filter(filterTags)
    buildList(data_matching);
    $(".result_count").html(data_matching.length)
    $(".result_tags").html(active_tags.join(", "))
}

function buildList(data) {
    let docFrag = document.createDocumentFragment();
    $(".tutos").html("");
    data.forEach(function (d) {
        let tuto_button = document.createElement("button");
        tuto_button.setAttribute('text', d.description);
        tuto_button.setAttribute('class', "tuto_button");
        tuto_button.innerHTML = d.title;
        docFrag.appendChild(tuto_button);
    });

    $(".tutos").append(docFrag);
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}