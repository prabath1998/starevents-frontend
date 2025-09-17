import { useEffect, useState } from "react";
import {
  adminListUsers,
  adminUpdateUserStatus,
  adminModifyUserRoles,
} from "../../api/admin";
import Table from "../../components/Table";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { Input, Select } from "../../components/Input";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState("");
  const [data, setData] = useState({ items: [] });

  const load = () =>
    adminListUsers({
      q,
      role: role || undefined,
      active: active === "" ? undefined : active === "true",
    })
      .then(setData)
      .catch(() => toast.error("Load failed"));

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await adminListUsers({
          q,
          role: role || undefined,
          active: active === "" ? undefined : active === "true",
        });
        if (!cancelled) setData(res);
      } catch {
        if (!cancelled) toast.error("Load failed");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [q, role, active]);

  const toggleActive = async (u) => {
    await adminUpdateUserStatus(u.id, !u.isActive);
    toast.success("Updated");
    load();
  };
  const grantOrganizer = async (u) => {
    await adminModifyUserRoles(u.id, ["Organizer"], []);
    toast.success("Granted");
    load();
  };
  const revokeOrganizer = async (u) => {
    await adminModifyUserRoles(u.id, [], ["Organizer"]);
    toast.success("Revoked");
    load();
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid sm:grid-cols-3 gap-3">
          <Input
            placeholder="Search email/name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Any role</option>
            <option>Customer</option>
            <option>Organizer</option>
            <option>Admin</option>
          </Select>
          <Select value={active} onChange={(e) => setActive(e.target.value)}>
            <option value="">Any status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </Select>
        </div>
      </Card>

      <Table
        columns={[
          { key: "email", label: "Email" },
          {
            key: "name",
            label: "Name",
            render: (_, r) => `${r.firstName} ${r.lastName}`,
          },
          {
            key: "roles",
            label: "Roles",
            render: (_, r) => r.roles.join(", "),
          },
          {
            key: "isActive",
            label: "Active",
            render: (v) => (v ? "Yes" : "No"),
          },
          {
            key: "actions",
            label: "Actions",
            render: (_, r) => (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => toggleActive(r)}>
                  {r.isActive ? "Deactivate" : "Activate"}
                </Button>
                {r.roles.includes("Organizer") ? (
                  <Button
                    variant="secondary"
                    onClick={() => revokeOrganizer(r)}
                  >
                    Revoke Organizer
                  </Button>
                ) : (
                  <Button onClick={() => grantOrganizer(r)}>
                    Grant Organizer
                  </Button>
                )}
              </div>
            ),
          },
        ]}
        rows={data.items}
        keyField="id"
      />
    </div>
  );
}
