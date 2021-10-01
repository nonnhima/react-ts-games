import React from 'react';
import DocumentMeta from 'react-document-meta';

export const Meta = () => {
    const meta = {
        title: 'オセロゲーム',
        meta: {
            charset: 'utf-8',
            name: {
                keywords: 'react,meta,document,html,tags'
            }
        }
    };

    return (<div>
        <DocumentMeta {...meta} />
    </div>
    )
}