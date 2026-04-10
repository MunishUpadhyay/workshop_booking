(function () {
    var h = React.createElement;

    function WorkshopCard(props) {
        return h('div', { className: 'rc-card' },
            h('div', { className: 'rc-card-body' },
                h('h3', { className: 'rc-card-name' }, props.name),
                h('p', { className: 'rc-card-meta' },
                    h('span', { className: 'rc-card-label' }, 'Duration'),
                    h('span', { className: 'rc-card-value' },
                        props.duration + ' day' + (props.duration === 1 ? '' : 's')
                    )
                )
            ),
            h('div', { className: 'rc-card-footer' },
                h('a', {
                    href: '/workshop/type_details/' + props.id,
                    className: 'rc-card-link'
                }, 'View Details \u2192')
            )
        );
    }

    function WorkshopCardGrid(props) {
        if (!props.types || props.types.length === 0) {
            return h('p', { className: 'rc-empty' }, 'No workshop types available yet.');
        }
        return h('div', { className: 'rc-grid' },
            props.types.map(function (t) {
                return h(WorkshopCard, { key: t.id, id: t.id, name: t.name, duration: t.duration });
            })
        );
    }

    window.mountCardView = function (containerId, dataId) {
        var dataEl = document.getElementById(dataId);
        if (!dataEl) return;

        var types;
        try {
            types = JSON.parse(dataEl.textContent);
        } catch (e) {
            return;
        }

        var container = document.getElementById(containerId);
        if (!container) return;

        var root = ReactDOM.createRoot(container);
        root.render(h(WorkshopCardGrid, { types: types }));
    };
}());
