import React from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  Tag,
  Popover,
  Switch,
} from "antd";

const DEPARMENT_SORTING_CRITERIAS = [
  {
    title: "ID",
    value: "id",
  },
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Code",
    value: "code",
  },
];

function TagRender(props) {
  const { value, closable, onClose, onOrderChange } = props;
  const [label, setLabel] = React.useState(props.label);

  const ordering = () => (
    <Switch
      checkedChildren="Ascending"
      unCheckedChildren="Descending"
      defaultChecked
      onChange={(isAscending) => {
        if (isAscending) setLabel(label.replace(" - Descending", ""));
        else setLabel(label + " - Descending");
        onOrderChange(value, isAscending);
      }}
    />
  );

  return (
    <Popover content={ordering}>
      <Tag
        closable={closable}
        onClose={onClose}
        color="blue"
        style={{ marginRight: 3, fontSize: "100%" }}
      >
        {label}
      </Tag>
    </Popover>
  );
}

export const DepartmentFilterComponent = ({ keyword, onFinish, onReset }) => {
    const [sortValues, setSortValues] = React.useState([]);

    const onSortValueOrderChange = (value, isAscending) => {
        if (isAscending) {
        setSortValues(
            sortValues.map((sortValue) =>
            sortValue.includes(value) ? sortValue.replace(",desc", "") : sortValue
            )
        );
        } else {
        setSortValues(
            sortValues.map((sortValue) =>
            sortValue === value ? sortValue.concat(",desc") : sortValue
            )
        );
        }
    };

    return (
        <Form className="search-form" onFinish={onFinish}>
        <Row style={{ width: "100%" }}>
            <Col span={21}>
            <Form.Item name="keyword">
                <Input
                type="text"
                placeholder="Filter by deparment name, code"
                allowClear={keyword}
                />
            </Form.Item>
            <Form.Item name="sort">
                <Select
                mode="multiple"
                tokenSeparators={[","]}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                tagRender={(props) => (
                    <TagRender {...props} onOrderChange={onSortValueOrderChange} />
                )}
                placeholder="Sort department by criterias"
                style={{ width: "100%", textAlign: "left" }}
                onChange={setSortValues}
                value={sortValues}
                >
                {DEPARMENT_SORTING_CRITERIAS.map((criteria) => (
                    <Select.Option key={criteria.value} value={criteria.value}>
                    {criteria.title}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>
            </Col>
            <Col span={3}>
            <Button type="primary" htmlType="submit">
                Search
            </Button>
            {keyword && (
                <Button onClick={onReset} style={{ marginRight: 3 }}>
                Clear
                </Button>
            )}
            </Col>
        </Row>
        </Form>
    );
};
