import React from 'react';
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';
import { resourceFromModel, rootModel } from './resource';
import ResourceItem from '../components/ResourceItem';
import RemoveResourceContainer from '../containers/RemoveResourceContainer';

export const type = 'file';
export const name = 'File';
export const icon = 'file';
export const rootChildrenHeading = 'Files';
export const childrenHeading = null;

export const fromModel = resourceFromModel;

export const fetchOne = ({ id }) => {
  return axios.get(`/file/${id}`).then(result => {
    return result.data;
  })
};

export const fetchMany = (options = {}) => {
  return Promise.resolve([]);
};

export const fetchResourcePath = ({ id }) => {
  // TOOD: We end up getting the file twice (fetchOne and fetchResourcePath)
  // from setResourceFocus in modules/focusedResource.js.
  // We should perhaps order the calls pass item id here to avoid this.
  return axios.get(`/file/${id}`).then(fileResult => {
    return Promise.all([
      axios.get(`/item/${fileResult.data.itemId}/rootpath`),
      axios.get(`/item/${fileResult.data.itemId}`),
    ]).then(([pathResult, itemResult]) => {
      return [
        rootModel(pathResult.data[0].type),
        ...pathResult.data.map(item => item.object),
        itemResult.data,
      ];
    });
  });
};

export const remove = ({id}) => {
  return axios.delete(`/${type}/${id}`).then(result => result.data);
};

export const fetchChildren = ({ id }) => {
  return Promise.resolve([]);
};

export const fileContent = ({ id }) => {
  return axios.get(`/file/${id}/download`).then(result => result.data);
}

export const item = ({ resource }) => (
  <ResourceItem
    url={`/file/${resource.id}`}
    icon={icon}
    name={resource.name}
    description={resource.description}
  />
);

export const removeAction = RemoveResourceContainer;

export const actions = [
  {
    key: 'download-file',
    component: ({ resource }) => (
      <Button as='a' href={`/api/v1/file/${resource.id}/download`}>
        <Icon name='download' />
        Download
      </Button>
    ),
  },
  {
    key: 'remove-file',
    component: 'file.removeAction',
  }
];
