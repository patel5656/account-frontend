import React, { useState, useEffect } from 'react';
import {
  X, Plus, Package, Barcode as BarcodeIcon, Globe, Image as ImageIcon,
  Settings, RefreshCw, Printer, Box, AlertTriangle, History
} from 'lucide-react';
import { SelectUnitsModal } from './SelectUnitsModal';

export function ItemMasterModal({ isOpen, onClose, onSave, editData, products = [] }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [mrp, setMrp] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');

  // Advanced fields
  const [tax, setTax] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [wholesalePrice, setWholesalePrice] = useState('');
  const [creditSalePrice, setCreditSalePrice] = useState('');
  const [baseUnit, setBaseUnit] = useState('');
  const [purchaseUnit, setPurchaseUnit] = useState('');
  const [salesUnit, setSalesUnit] = useState('');
  const [lowStockAlert, setLowStockAlert] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [openingStockRate, setOpeningStockRate] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [warehouseList, setWarehouseList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedLocationId, setSelectedLocationId] = useState('');
  const [location, setLocation] = useState('');

  const [isActive, setIsActive] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');

  // Variant states
  const [memorySize, setMemorySize] = useState('');
  const [colorVariant, setColorVariant] = useState('');
  const [designModel, setDesignModel] = useState('');

  // Dynamic Attribute States
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryConfig, setSelectedCategoryConfig] = useState(null);
  const [dynamicValues, setDynamicValues] = useState({});
  const [activeMultiSelectField, setActiveMultiSelectField] = useState(null);

  // Inventory tracking states
  const [enableBatch, setEnableBatch] = useState(false);
  const [enableExpiry, setEnableExpiry] = useState(false);
  const [enableImei, setEnableImei] = useState(false);

  // BOM states
  const [hasBom, setHasBom] = useState(false);
  const [bomName, setBomName] = useState('');
  const [isMultiLevel, setIsMultiLevel] = useState(false);
  const [bomRecipe, setBomRecipe] = useState([]);
  const [tempRawMaterial, setTempRawMaterial] = useState('');
  const [tempQty, setTempQty] = useState('');
  const [tempUnit, setTempUnit] = useState('PCS');

  const [isSelectUnitsModalOpen, setIsSelectUnitsModalOpen] = useState(false);

  const addBomItem = (e) => {
    if (e) e.preventDefault();

    // Calculate current cost dynamically
    const calculateBomCost = () => {
      return bomRecipe.reduce((total, item) => {
        const prod = products.find(p => p.id.toString() === item.productId?.toString());
        const price = prod ? (prod.purchasePrice || prod.price || prod.mrp || 0) : 0;
        return total + (parseFloat(item.quantity) * parseFloat(price));
      }, 0);
    };
    if (!tempRawMaterial || !tempQty) return;
    const selectedProd = products.find(p => p.id.toString() === tempRawMaterial);
    setBomRecipe([...bomRecipe, {
      productId: tempRawMaterial,
      name: selectedProd ? selectedProd.name : 'Unknown',
      quantity: tempQty,
      unit: tempUnit
    }]);
    setTempRawMaterial('');
    setTempQty('');
  };

  const removeBomItem = (idx) => {
    setBomRecipe(bomRecipe.filter((_, i) => i !== idx));
  };

  // Online Sync states
  const [syncOnline, setSyncOnline] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [onlineProductName, setOnlineProductName] = useState('');
  const [onlineProductDesc, setOnlineProductDesc] = useState('');
  const [onlineSalePrice, setOnlineSalePrice] = useState('');
  const [ecommerceCategory, setEcommerceCategory] = useState('');

  // Pricing states
  const [qtySlabs, setQtySlabs] = useState([]);
  const [slabError, setSlabError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setName(editData.name || '');
        setSku(editData.sku || '');
        setCategory(editData.category || '');
        setBrand(editData.brand || '');
        setMrp(editData.mrp?.toString() || '');
        setPrice(editData.price?.toString() || '');
        setQty(editData.qty?.toString() || '');
        setBarcode(editData.barcode || '');
        setIsActive(editData.status === 'ACTIVE' || editData.status === 'Active');

        setMemorySize(editData.memorySize || '');
        setColorVariant(editData.colorVariant || '');
        setDesignModel(editData.designModel || '');

        if (editData.attributeValues) {
          const vals = {};
          editData.attributeValues.forEach(av => {
            vals[av.attributeId] = av.value;
          });
          setDynamicValues(vals);
        }
        setEnableImei(editData.enableImei || false);
        setTax(editData.tax?.toString() || '');
        setHsnCode(editData.hsnCode || '');
        setPurchasePrice(editData.purchasePrice?.toString() || '');
        setWholesalePrice(editData.wholesalePrice?.toString() || '');
        setCreditSalePrice(editData.creditSalePrice?.toString() || '');
        setBaseUnit(editData.baseUnit || '');
        setPurchaseUnit(editData.purchaseUnit || '');
        setSalesUnit(editData.salesUnit || '');
        setLowStockAlert(editData.lowStockAlert?.toString() || '');
        setReorderLevel(editData.reorderLevel?.toString() || '');
        setOpeningStockRate(editData.openingStockRate?.toString() || '');
        setWarehouse(editData.warehouse || '');
        setEnableBatch(editData.enableBatch || false);
        setEnableExpiry(editData.enableExpiry || false);
        setHasBom(editData.hasBom || false);
        setBomName(editData.bomName || '');
        setIsMultiLevel(editData.isMultiLevel || false);
        try {
          const recipe = typeof editData.bomRecipe === 'string' ? JSON.parse(editData.bomRecipe) : editData.bomRecipe;
          setBomRecipe(Array.isArray(recipe) ? recipe : []);
        } catch (e) { setBomRecipe([]); }
        setSyncOnline(editData.syncOnline || false);
        setOnlineProductName(editData.onlineProductName || '');
        setOnlineProductDesc(editData.onlineProductDesc || '');
        setOnlineSalePrice(editData.onlineSalePrice?.toString() || '');
        setEcommerceCategory(editData.ecommerceCategory || '');
        setImagePreview(editData.productImage || null);
        try {
          const slabs = typeof editData.qtySlabs === 'string' ? JSON.parse(editData.qtySlabs) : editData.qtySlabs;
          setQtySlabs(Array.isArray(slabs) ? slabs : []);
        } catch (e) { setQtySlabs([]); }
      } else {
        setName(''); setSku(''); setCategory(''); setBrand(''); setMrp(''); setPrice(''); setQty(''); setBarcode(''); setIsActive(true); setDynamicValues({}); setEnableImei(false);
        setMemorySize(''); setColorVariant(''); setDesignModel('');
        setTax(''); setHsnCode(''); setPurchasePrice(''); setWholesalePrice(''); setCreditSalePrice(''); setBaseUnit(''); setPurchaseUnit(''); setSalesUnit(''); setLowStockAlert(''); setReorderLevel(''); setOpeningStockRate(''); setWarehouse(''); setEnableBatch(false); setEnableExpiry(false); setHasBom(false); setQtySlabs([]); setBomName(''); setIsMultiLevel(false); setBomRecipe([]); setTempRawMaterial(''); setTempQty(''); setSyncOnline(false); setOnlineProductName(''); setOnlineProductDesc(''); setOnlineSalePrice(''); setEcommerceCategory(''); setImagePreview(null);
        setSelectedBranchId(''); setSelectedLocationId(''); setLocation('');
      }
    }
  }, [isOpen, editData]);

  useEffect(() => {
    if (editData && warehouseList.length > 0) {
      const matchedWh = warehouseList.find(w => w.name === editData.warehouse);
      if (matchedWh) {
        setSelectedBranchId(matchedWh.branchId ? matchedWh.branchId.toString() : '');
        setSelectedLocationId(matchedWh.locationId ? matchedWh.locationId.toString() : '');
        setWarehouse(matchedWh.name);
      }
    }
  }, [editData, warehouseList]);

  useEffect(() => {
    if (warehouse && warehouseList.length > 0) {
      const matchedWh = warehouseList.find(w => w.name === warehouse);
      if (matchedWh) {
        setLocation(matchedWh.locRef?.name || matchedWh.location || '');
      }
    } else {
      setLocation('');
    }
  }, [warehouse, warehouseList]);

  useEffect(() => {
    if (isOpen) {
      fetchWarehouses();
      fetchUnits();
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const { default: apiClient } = await import('../api/apiClient');
      const res = await apiClient.get('/categories');
      if (res.data && res.data.data) {
        setCategoriesList(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (categoriesList.length > 0 && category) {
      const config = categoriesList.find(c => c.name === category);
      setSelectedCategoryConfig(config || null);
    } else {
      setSelectedCategoryConfig(null);
    }
  }, [categoriesList, category]);

  const handleDynamicChange = (attributeId, value, isMulti) => {
    if (isMulti) {
      setDynamicValues(prev => {
        const current = Array.isArray(prev[attributeId]) ? prev[attributeId] : [];
        if (current.includes(value)) {
          return { ...prev, [attributeId]: current.filter(v => v !== value) };
        } else {
          return { ...prev, [attributeId]: [...current, value] };
        }
      });
    } else {
      setDynamicValues(prev => ({ ...prev, [attributeId]: value }));
    }
  };

  const fetchUnits = async () => {
    try {
      const { default: apiClient } = await import('../api/apiClient');
      const res = await apiClient.get('/units');
      if (res.data && res.data.data) {
        setUnitList(res.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch units:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const { default: apiClient } = await import('../api/apiClient');
      const [whRes, brRes, locRes] = await Promise.all([
        apiClient.get('/warehouses'),
        apiClient.get('/branches'),
        apiClient.get('/locations')
      ]);
      if (whRes.data?.success) {
        setWarehouseList(whRes.data.data);
      }
      if (brRes.data?.success) {
        setBranchList(brRes.data.data);
      }
      if (locRes.data?.success) {
        setLocationList(locRes.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch warehouses, branches, locations:', error);
    }
  };

  const handleSave = () => {
    setSlabError('');
    if (qtySlabs.length > 0) {
      for (let i = 0; i < qtySlabs.length; i++) {
        const slab = qtySlabs[i];
        const min = Number(slab.minQty);
        const max = Number(slab.maxQty);
        const price = Number(slab.price);

        if (slab.minQty === '' || slab.maxQty === '') {
          setSlabError(`Slab ${i + 1}: Min and Max quantity cannot be empty.`);
          setActiveTab('basic');
          return;
        }
        if (min >= max) {
          setSlabError(`Slab ${i + 1}: Min Quantity (${min}) must be less than Max Quantity (${max}).`);
          setActiveTab('basic');
          return;
        }
        if (!slab.price || price <= 0) {
          setSlabError(`Slab ${i + 1}: Special Price cannot be empty or zero.`);
          setActiveTab('basic');
          return;
        }
      }

      const sortedSlabs = [...qtySlabs].sort((a, b) => Number(a.minQty) - Number(b.minQty));
      for (let i = 0; i < sortedSlabs.length - 1; i++) {
        if (Number(sortedSlabs[i].maxQty) >= Number(sortedSlabs[i + 1].minQty)) {
          setSlabError(`Slabs cannot overlap. Overlap found between Max Qty ${sortedSlabs[i].maxQty} and Min Qty ${sortedSlabs[i + 1].minQty}.`);
          setActiveTab('basic');
          return;
        }
      }
    }

    // Extract values from form elements
    const newItem = {
      name: name || 'New Item',

      attributeValues: Object.keys(dynamicValues).map(key => ({
        attributeId: parseInt(key, 10),
        value: dynamicValues[key]
      })),

      category: category || '',
      brand: brand || '',
      sku: sku || `SKU${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: barcode || Math.floor(Math.random() * 1000000000).toString(),
      mrp: mrp || '0',
      price: price || '0',
      qty: qty || '0',
      status: isActive ? 'Active' : 'Inactive',
      hasBom: hasBom,
      memorySize: memorySize,
      colorVariant: colorVariant,
      designModel: designModel,

      enableImei: enableImei,
      tax: tax,
      hsnCode: hsnCode,
      purchasePrice: purchasePrice,
      wholesalePrice: wholesalePrice,
      creditSalePrice: creditSalePrice,
      baseUnit: baseUnit,
      purchaseUnit: purchaseUnit,
      salesUnit: salesUnit,
      lowStockAlert: lowStockAlert,
      reorderLevel: reorderLevel,
      openingStockRate: openingStockRate,
      warehouse: warehouse,
      location: location,
      enableBatch: enableBatch,
      enableExpiry: enableExpiry,
      qtySlabs: qtySlabs,
      hasBom: hasBom,
      bomName: bomName,
      isMultiLevel: isMultiLevel,
      bomRecipe: bomRecipe,
      syncOnline: syncOnline,
      onlineProductName: onlineProductName,
      onlineProductDesc: onlineProductDesc,
      onlineSalePrice: onlineSalePrice,
      ecommerceCategory: ecommerceCategory,
      productImage: imagePreview
    };

    if (onSave) {
      onSave(newItem);
    }

    onClose();
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'basic', label: 'Basic Details', icon: Package },
    { id: 'inventory', label: 'Inventory & Tracking', icon: Box },
    { id: 'bom', label: 'Bill of Materials', icon: Settings },
    { id: 'barcode', label: 'Barcode', icon: BarcodeIcon },
    { id: 'online', label: 'Online Store', icon: Globe },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[3px] shadow-2xl w-full max-w-[min(98vw,950px)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 h-[90vh] md:h-auto md:max-h-[90vh]">

        {/* Header */}
        <div className="bg-[#4F46E5] flex items-center justify-between">
          <h2 className="text-[15px] text-white font-medium tracking-wide pl-4 py-2.5 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Advanced Item Master
          </h2>
          <button
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] h-full px-3 py-2.5 focus:outline-none transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={3} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100 border-b border-gray-200 px-4 pt-3 gap-1 overflow-x-auto custom-scrollbar flex-shrink-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-[13px] font-bold rounded-t-[3px] transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-white text-[#4F46E5] border-x border-t border-gray-200 border-b-0 -mb-[1px] relative z-10'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200 border border-transparent'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Body content based on active tab */}
        <div className="p-4 md:p-6 bg-white overflow-y-auto custom-scrollbar flex-1 min-h-[400px]">

          {/* TAB 1: BASIC DETAILS */}
          {activeTab === 'basic' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[14px] font-bold text-gray-800 mb-1 block">Item Name</label>
                  <input id="item_name_input" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter Item Name" className="w-full border border-[#4F46E5] bg-[#e8e5ff] placeholder-gray-500 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] shadow-[0_0_0_0.2rem_rgba(79,70,229,0.25)] font-bold" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[14px] font-bold text-gray-800">Item Code / SKU</label>
                  <input id="item_sku_input" value={sku} onChange={e => setSku(e.target.value)} type="text" placeholder="Enter Item Code / SKU" className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white" />
                </div>
                <div className="flex flex-col gap-1 w-full pl-2">
                  <label className="text-[14px] font-bold text-gray-800 mb-1 block">Status</label>
                  <div className="flex items-center gap-3 mt-1">
                    <div
                      className={`w-[44px] h-[24px] rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-[#28a745]' : 'bg-gray-400'}`}
                      onClick={() => setIsActive(!isActive)}
                    >
                      <div className={`w-[20px] h-[20px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isActive ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <span className={`text-[14px] font-bold ${isActive ? 'text-[#28a745]' : 'text-gray-500'}`}>{isActive ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b border-gray-100 pb-5">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">Category</label>
                  <select
                    id="item_category_input"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                  >
                    <option value="">Select Category</option>
                    {categoriesList.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">Brand</label>
                  <input
                    id="item_brand_input"
                    type="text"
                    placeholder="Enter Brand"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">GST / Tax (%)</label>
                  <input
                    type="number"
                    value={tax} onChange={e => setTax(e.target.value)}
                    placeholder="e.g. 18"
                    className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">HSN Code</label>
                  <input type="text" value={hsnCode} onChange={e => setHsnCode(e.target.value)} placeholder="e.g. 8517" className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white" />
                </div>
              </div>

              {selectedCategoryConfig && selectedCategoryConfig.attributes && selectedCategoryConfig.attributes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 pb-5">
                  {selectedCategoryConfig.attributes.map(attr => {
                    const isMulti = attr.type === 'Multi Select' || attr.type === 'Checkbox';
                    const isDropdown = attr.type === 'Dropdown' || attr.type === 'Radio';

                    return (
                      <div key={attr.id} className="flex flex-col gap-1 w-full relative">
                        <label className="text-[13px] font-bold text-gray-800">
                          {attr.name} {attr.isRequired && <span className="text-red-500">*</span>}
                        </label>

                        {isMulti ? (
                          <div className="relative">
                            <div
                              onClick={() => setActiveMultiSelectField(activeMultiSelectField === attr.id ? null : attr.id)}
                              className="w-full border border-gray-300 rounded-[3px] px-2 py-1 min-h-[34px] flex flex-wrap gap-1 items-center bg-white cursor-pointer"
                            >
                              {(Array.isArray(dynamicValues[attr.id]) ? dynamicValues[attr.id] : []).length === 0 && (
                                <span className="text-gray-400 text-[13px] px-1">e.g. Select {attr.name}</span>
                              )}
                              {(Array.isArray(dynamicValues[attr.id]) ? dynamicValues[attr.id] : []).map(val => (
                                <span key={val} className="bg-indigo-100 text-indigo-800 text-[12px] font-semibold px-2 py-0.5 rounded-[3px] flex items-center gap-1">
                                  {val}
                                  <X
                                    className="w-3 h-3 cursor-pointer hover:text-indigo-900"
                                    onClick={(e) => { e.stopPropagation(); handleDynamicChange(attr.id, val, true); }}
                                  />
                                </span>
                              ))}
                            </div>

                            {activeMultiSelectField === attr.id && (
                              <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-gray-200 rounded-[3px] shadow-lg z-50 max-h-[200px] overflow-y-auto">
                                {Array.isArray(attr.options) && attr.options.map(opt => {
                                  const optValue = typeof opt === 'object' ? opt.value : opt;
                                  const optLabel = typeof opt === 'object' ? opt.label || opt.value : opt;
                                  const isSelected = (Array.isArray(dynamicValues[attr.id]) ? dynamicValues[attr.id] : []).includes(optValue);
                                  return (
                                    <div
                                      key={optValue}
                                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                      onClick={() => handleDynamicChange(attr.id, optValue, true)}
                                    >
                                      <input type="checkbox" checked={isSelected} readOnly className="accent-[#4F46E5] w-3 h-3" />
                                      <span className="text-[13px] text-gray-700">{optLabel}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ) : isDropdown ? (
                          <select
                            value={dynamicValues[attr.id] || ''}
                            onChange={(e) => handleDynamicChange(attr.id, e.target.value, false)}
                            className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                          >
                            <option value="">Select {attr.name}</option>
                            {Array.isArray(attr.options) && attr.options.map(opt => {
                              const optValue = typeof opt === 'object' ? opt.value : opt;
                              const optLabel = typeof opt === 'object' ? opt.label || opt.value : opt;
                              return (
                                <option key={optValue} value={optValue}>{optLabel}</option>
                              );
                            })}
                          </select>
                        ) : (
                          <input
                            type={attr.type === 'Number' ? 'number' : 'text'}
                            value={dynamicValues[attr.id] || ''}
                            onChange={(e) => handleDynamicChange(attr.id, e.target.value, false)}
                            placeholder={`e.g. Enter ${attr.name}`}
                            className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] text-gray-800 bg-white"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Advanced Unit System */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-[3px]">
                <h4 className="text-[14px] font-bold text-blue-900 mb-3 flex items-center justify-between">
                  Unit Conversions
                  <button className="text-[12px] bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded-[3px] shadow-sm flex items-center gap-1 hover:bg-blue-100 transition-colors" onClick={() => setIsSelectUnitsModalOpen(true)}>
                    <Plus className="w-3 h-3" /> Manage Units
                  </button>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-700">Base Unit (Reporting)</label>
                    <input 
                      readOnly
                      onClick={() => setIsSelectUnitsModalOpen(true)}
                      value={baseUnit ? (purchaseUnit && purchaseUnit !== baseUnit ? `${baseUnit} - ${purchaseUnit}` : baseUnit) : ''} 
                      placeholder="Select Unit" 
                      className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white cursor-pointer" 
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-700">Purchase Unit</label>
                    <input list="purchaseUnitOptions" value={purchaseUnit} onChange={e => setPurchaseUnit(e.target.value)} placeholder="Select or type unit" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white" />
                    <datalist id="purchaseUnitOptions">
                      {unitList.map(u => <option key={u.id} value={u.name} />)}
                      {unitList.length === 0 && <option value="BOX" />}
                    </datalist>
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[13px] font-bold text-gray-700">Sales Unit</label>
                    <input list="salesUnitOptions" value={salesUnit} onChange={e => setSalesUnit(e.target.value)} placeholder="Select or type unit" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white" />
                    <datalist id="salesUnitOptions">
                      {unitList.map(u => <option key={u.id} value={u.name} />)}
                      {unitList.length === 0 && <option value="PCS" />}
                    </datalist>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">MRP</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[13px]">₹</span>
                    <input id="item_mrp_input" value={mrp} onChange={e => setMrp(e.target.value)} type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-6 pr-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] bg-white text-right font-bold" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">Purchase Price</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[13px]">₹</span>
                    <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-6 pr-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] bg-white text-right font-bold" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">Sale Price</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[13px]">₹</span>
                    <input id="item_saleprice_input" value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-6 pr-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] bg-white text-right font-bold" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">Wholesale Price</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[13px]">₹</span>
                    <input type="number" value={wholesalePrice} onChange={e => setWholesalePrice(e.target.value)} placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-6 pr-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] bg-[#fff8e1] text-right font-bold" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-[13px] font-bold text-gray-800">Credit Sale Price</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[13px]">₹</span>
                    <input type="number" value={creditSalePrice} onChange={e => setCreditSalePrice(e.target.value)} placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-6 pr-2 py-1.5 text-[13px] outline-none focus:border-[#4F46E5] bg-[#e1f5fe] text-right font-bold" />
                  </div>
                </div>
              </div>

              {/* Special Quantity Wise Pricing */}
              <div className="bg-green-50 border border-green-200 p-4 rounded-[3px] mt-2">
                <h4 className="text-[14px] font-bold text-green-900 mb-3 flex items-center justify-between">
                  Special Quantity Wise Pricing
                  <button
                    onClick={() => { setSlabError(''); setQtySlabs([...qtySlabs, { minQty: '', maxQty: '', price: '' }]); }}
                    className="text-[12px] bg-white border border-green-300 text-green-700 px-2 py-1 rounded-[3px] shadow-sm flex items-center gap-1 hover:bg-green-100 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add Slab
                  </button>
                </h4>
                {slabError && <div className="text-red-600 text-[12px] font-bold mb-3 p-2 bg-red-50 border border-red-200 rounded-[3px]">{slabError}</div>}
                {qtySlabs.length === 0 ? (
                  <p className="text-[12px] text-green-700 italic">No quantity slabs defined. Regular prices will apply.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-12 gap-2 px-2 pb-1 border-b border-green-200 text-[12px] font-bold text-green-800">
                      <div className="col-span-4">Min Quantity</div>
                      <div className="col-span-4">Max Quantity</div>
                      <div className="col-span-3">Special Price</div>
                      <div className="col-span-1 text-center">Action</div>
                    </div>
                    {qtySlabs.map((slab, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-4">
                          <input type="number" placeholder="e.g. 1" value={slab.minQty} onChange={(e) => { const newSlabs = [...qtySlabs]; newSlabs[index].minQty = e.target.value; setQtySlabs(newSlabs); }} className="w-full border border-green-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-green-500 bg-white" />
                        </div>
                        <div className="col-span-4">
                          <input type="number" placeholder="e.g. 10" value={slab.maxQty} onChange={(e) => { const newSlabs = [...qtySlabs]; newSlabs[index].maxQty = e.target.value; setQtySlabs(newSlabs); }} className="w-full border border-green-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-green-500 bg-white" />
                        </div>
                        <div className="col-span-3">
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-[12px]">₹</span>
                            <input type="number" placeholder="0.00" value={slab.price} onChange={(e) => { const newSlabs = [...qtySlabs]; newSlabs[index].price = e.target.value; setQtySlabs(newSlabs); }} className="w-full border border-green-300 rounded-[3px] pl-5 pr-2 py-1.5 text-[13px] outline-none focus:border-green-500 bg-white font-bold text-right" />
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <button onClick={() => setQtySlabs(qtySlabs.filter((_, i) => i !== index))} className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY & TRACKING */}
          {activeTab === 'inventory' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">

              <div className="bg-gray-50 p-4 rounded-[3px] border border-gray-200">
                <h4 className="text-[14px] font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">Initial Stock Setup</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Opening Stock Qty</label>
                    <input id="item_openingstock_input" value={qty} onChange={e => setQty(e.target.value)} type="number" placeholder="0" className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Opening Stock Rate</label>
                    <input type="number" value={openingStockRate} onChange={e => setOpeningStockRate(e.target.value)} placeholder="₹0.00" className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Branch</label>
                    <select 
                      value={selectedBranchId} 
                      onChange={(e) => {
                        setSelectedBranchId(e.target.value);
                        setSelectedLocationId('');
                        setWarehouse('');
                      }} 
                      className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white text-gray-800"
                    >
                      <option value="">Select Branch</option>
                      {branchList.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Location</label>
                    <select 
                      value={selectedLocationId} 
                      onChange={(e) => {
                        setSelectedLocationId(e.target.value);
                        setWarehouse('');
                      }} 
                      disabled={!selectedBranchId}
                      className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Location</option>
                      {locationList.filter(l => l.branchId === parseInt(selectedBranchId, 10)).map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Warehouse / Godown</label>
                    <select 
                      value={warehouse} 
                      onChange={(e) => setWarehouse(e.target.value)} 
                      disabled={!selectedLocationId}
                      className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Warehouse</option>
                      {warehouseList.filter(w => w.branchId === parseInt(selectedBranchId, 10) && w.locationId === parseInt(selectedLocationId, 10)).map(wh => (
                        <option key={wh.id} value={wh.name}>{wh.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-[3px] border border-yellow-200">
                <h4 className="text-[14px] font-bold text-yellow-900 mb-3 border-b border-yellow-200 pb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Stock Alerts
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Low Stock Alert Limit</label>
                    <input type="number" value={lowStockAlert} onChange={e => setLowStockAlert(e.target.value)} placeholder="e.g. 10" className="w-full border border-yellow-300 bg-white rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-yellow-500" />
                    <span className="text-[11px] text-gray-500">System will warn you when stock drops below this limit.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-gray-700">Reorder Level (Auto PO)</label>
                    <input type="number" value={reorderLevel} onChange={e => setReorderLevel(e.target.value)} placeholder="e.g. 5" className="w-full border border-yellow-300 bg-white rounded-[3px] px-3 py-1.5 text-[13px] outline-none focus:border-yellow-500" />
                    <span className="text-[11px] text-gray-500">Suggested quantity to order when stock is low.</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-[3px] border border-purple-200">
                <h4 className="text-[14px] font-bold text-purple-900 mb-3 border-b border-purple-200 pb-2 flex items-center gap-2">
                  <History className="w-4 h-4" /> Advanced Tracking
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white border border-purple-100 rounded-[3px]">
                    <div
                      className={`w-[36px] h-[20px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${enableBatch ? 'bg-purple-600' : 'bg-gray-300'}`}
                      onClick={() => setEnableBatch(!enableBatch)}
                    >
                      <div className={`w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${enableBatch ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-800">Enable Batch Management</h4>
                      <p className="text-[11px] text-gray-500">Track items by manufacturing batch/lot number.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white border border-purple-100 rounded-[3px]">
                    <div
                      className={`w-[36px] h-[20px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${enableExpiry ? 'bg-purple-600' : 'bg-gray-300'}`}
                      onClick={() => setEnableExpiry(!enableExpiry)}
                    >
                      <div className={`w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${enableExpiry ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-800">Enable Expiry Tracking</h4>
                      <p className="text-[11px] text-gray-500">Force expiry date entry during purchase.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white border border-purple-100 rounded-[3px]">
                    <div
                      className={`w-[36px] h-[20px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${enableImei ? 'bg-purple-600' : 'bg-gray-300'}`}
                      onClick={() => setEnableImei(!enableImei)}
                    >
                      <div className={`w-[16px] h-[16px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${enableImei ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-800">Enable IMEI Tracking</h4>
                      <p className="text-[11px] text-gray-500">Track unique IMEI numbers for each piece.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BOM */}
          {activeTab === 'bom' && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-[3px]">
                <div
                  className={`w-[40px] h-[22px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${hasBom ? 'bg-[#28a745]' : 'bg-gray-400'}`}
                  onClick={() => setHasBom(!hasBom)}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${hasBom ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-800">Enable Bill of Materials (BOM)</h4>
                  <p className="text-[12px] text-gray-600">Mark this item as a Finished Good and define its recipe/components.</p>
                </div>
              </div>

              {hasBom && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-gray-800">BOM Name</label>
                      <input type="text" value={bomName} onChange={e => setBomName(e.target.value)} placeholder="e.g. Standard Recipe 1" className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <label className="text-[13px] font-bold text-gray-800">Multi-Level BOM</label>
                        <div
                          className={`w-[32px] h-[16px] rounded-full relative cursor-pointer transition-colors ${isMultiLevel ? 'bg-blue-600' : 'bg-gray-300'}`}
                          onClick={() => setIsMultiLevel(!isMultiLevel)}
                        >
                          <div className={`w-[12px] h-[12px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${isMultiLevel ? 'translate-x-[18px]' : 'translate-x-[2px]'}`}></div>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">If enabled, you can add other BOM items as raw materials to create hierarchical recipes.</p>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-[3px]">
                    <div className="bg-[#343a40] text-white p-2 text-[13px] font-bold flex justify-between items-center rounded-t-[2px]">
                      <span>Raw Materials / Components</span>
                      <span className="bg-[#28a745] px-2 py-0.5 rounded text-[11px]">
                        Calculated Cost: ₹{bomRecipe.reduce((total, item) => {
                          const prod = products.find(p => p.id.toString() === item.productId?.toString());
                          const price = prod ? (prod.purchasePrice || prod.price || prod.mrp || 0) : 0;
                          return total + (parseFloat(item.quantity) * parseFloat(price));
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="grid grid-cols-12 gap-2 p-2 border-b border-gray-200 bg-gray-100 text-[12px] font-bold text-gray-700">
                      <div className="col-span-6">Raw Material Item</div>
                      <div className="col-span-3">Quantity</div>
                      <div className="col-span-2">Unit</div>
                      <div className="col-span-1 text-center">Action</div>
                    </div>

                    {/* Input Row */}
                    <div className="grid grid-cols-12 gap-2 p-2 border-b border-gray-200 items-center">
                      <div className="col-span-6">
                        <select value={tempRawMaterial} onChange={e => setTempRawMaterial(e.target.value)} className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-white">
                          <option value="">Select Raw Material...</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-3">
                        <input type="number" value={tempQty} onChange={e => setTempQty(e.target.value)} placeholder="Qty" className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 text-right" />
                      </div>
                      <div className="col-span-2">
                        <select value={tempUnit} onChange={e => setTempUnit(e.target.value)} className="w-full border border-gray-300 rounded-[3px] px-2 py-1.5 text-[13px] outline-none focus:border-blue-500 bg-gray-50">
                          <option value="">Unit</option>
                          {unitList.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <button type="button" onClick={addBomItem} className="bg-[#007bff] hover:bg-[#0069d9] text-white p-1.5 rounded-[3px] transition-colors shadow-sm">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {bomRecipe.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-2 p-2 border-b border-gray-100 items-center text-[12px]">
                        <div className="col-span-6 text-gray-800 font-medium">{item.name}</div>
                        <div className="col-span-3 text-right">{item.quantity}</div>
                        <div className="col-span-2 text-gray-600">{item.unit}</div>
                        <div className="col-span-1 flex justify-center">
                          <button type="button" onClick={() => removeBomItem(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {bomRecipe.length === 0 && (
                      <div className="p-4 text-center text-[13px] text-gray-500 bg-white">
                        No materials added to BOM yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BARCODE */}
          {activeTab === 'barcode' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[14px] font-bold text-gray-800">Barcode / EAN / UPC</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        placeholder="Scan or enter manually"
                        className="w-full border border-gray-300 rounded-l-[3px] px-3 py-2 text-[14px] outline-none focus:border-[#4F46E5] font-mono"
                      />
                      <button
                        onClick={() => setBarcode('890123456789')}
                        className="bg-[#4F46E5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-r-[3px] text-[13px] font-bold transition-colors whitespace-nowrap flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4" /> Generate
                      </button>
                    </div>
                    <p className="text-[12px] text-gray-500 mt-1">Leave empty to auto-generate unique barcode upon saving.</p>
                  </div>

                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-[3px]">
                    <h4 className="text-[13px] font-bold text-yellow-800 mb-1">POS / Scanner Ready</h4>
                    <p className="text-[12px] text-yellow-700 leading-tight">
                      Barcodes assigned here can be scanned globally in Purchase, Sales, and Stock Adjustment modules to automatically fetch this item's details.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-[3px] p-6 bg-gray-50">
                  <h4 className="text-[13px] font-bold text-gray-600 mb-4 w-full text-left">Barcode Label Preview</h4>

                  {barcode ? (
                    <div className="flex flex-col items-center gap-3 bg-white p-4 border border-gray-200 shadow-sm rounded w-[250px]">
                      <div className="h-[60px] w-full flex items-end justify-center px-2 opacity-80">
                        {/* CSS-based fake barcode */}
                        {[3, 1, 4, 2, 1, 3, 1, 4, 2, 3, 2, 1, 4, 1, 2, 3].map((w, i) => (
                          <div key={i} className={`h-full bg-black mx-[1px]`} style={{ width: `${w}px` }}></div>
                        ))}
                      </div>
                      <span className="font-mono text-[14px] tracking-[4px] text-black font-medium">{barcode}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 py-6">
                      <BarcodeIcon className="w-12 h-12 mb-2 opacity-50" strokeWidth={1} />
                      <span className="text-[13px]">No barcode assigned yet</span>
                    </div>
                  )}

                  <button
                    disabled={!barcode}
                    className={`mt-6 flex items-center gap-1.5 px-4 py-1.5 rounded-[3px] text-[13px] font-bold transition-colors shadow-sm ${barcode ? 'bg-[#ffc107] hover:bg-[#e0a800] text-gray-900' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    <Printer className="w-4 h-4" strokeWidth={2.5} /> Print Labels
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ONLINE STORE */}
          {activeTab === 'online' && (
            <div className="flex flex-col gap-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-100 rounded-[3px]">
                <div
                  className={`w-[40px] h-[22px] rounded-full relative cursor-pointer transition-colors flex-shrink-0 ${syncOnline ? 'bg-[#4F46E5]' : 'bg-gray-400'}`}
                  onClick={() => setSyncOnline(!syncOnline)}
                >
                  <div className={`w-[18px] h-[18px] bg-white rounded-full absolute top-[2px] shadow-sm transition-transform ${syncOnline ? 'translate-x-[20px]' : 'translate-x-[2px]'}`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-gray-800">Sync with Online Store</h4>
                  <p className="text-[12px] text-gray-600">Enable this to publish this item to your integrated eCommerce storefront.</p>
                </div>

              </div>

              {syncOnline && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-gray-800">Online Product Name</label>
                      <input type="text" value={onlineProductName} onChange={e => setOnlineProductName(e.target.value)} placeholder="Defaults to main Item Name if empty" className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-purple-500 bg-white" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-bold text-gray-800">Online Product Description</label>
                      <textarea rows="4" value={onlineProductDesc} onChange={e => setOnlineProductDesc(e.target.value)} placeholder="Enter detailed description for online shoppers..." className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-purple-500 resize-none bg-white"></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[13px] font-bold text-gray-800">Online Sale Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                          <input type="number" value={onlineSalePrice} onChange={e => setOnlineSalePrice(e.target.value)} placeholder="0.00" className="w-full border border-gray-300 rounded-[3px] pl-7 pr-3 py-2 text-[13px] outline-none focus:border-purple-500 bg-white" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[13px] font-bold text-gray-800">eCommerce Category</label>
                        <select value={ecommerceCategory} onChange={e => setEcommerceCategory(e.target.value)} className="border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] outline-none focus:border-purple-500 bg-white">
                          <option value="">Select Category</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Clothing">Clothing</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-gray-800">Product Images</label>
                    <label className="border-2 border-dashed border-gray-300 rounded-[3px] h-[150px] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors group relative overflow-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImagePreview(reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                          <div
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer shadow-md"
                            onClick={(e) => {
                              e.preventDefault();
                              setImagePreview(null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </div>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-purple-500 transition-colors mb-2" />
                          <span className="text-[13px] font-medium text-gray-600">Click to upload image</span>
                          <span className="text-[11px] text-gray-400 mt-1">Max size: 2MB</span>
                        </>
                      )}
                    </label>

                    <div className="mt-2 bg-blue-50 border border-blue-100 rounded-[3px] p-3 text-[12px] text-blue-800">
                      <strong>Auto-Sync Active:</strong> Stock quantity and SKU will automatically sync continuously with main inventory.
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#f8f9fa] px-4 md:px-6 py-3 flex justify-end gap-2 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleSave}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-5 py-[7px] rounded-[3px] text-[14px] font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            Save Item
          </button>
          <button
            onClick={onClose}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-5 py-[7px] rounded-[3px] text-[14px] transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>

        <SelectUnitsModal 
          isOpen={isSelectUnitsModalOpen}
          onClose={() => setIsSelectUnitsModalOpen(false)}
          units={unitList.map(u => u.name)}
          initialPrimary={baseUnit}
          initialSecondary={purchaseUnit}
          onSave={(primary, secondary) => {
            setBaseUnit(primary);
            if (secondary) {
              setPurchaseUnit(secondary);
              setSalesUnit(secondary);
            }
            setIsSelectUnitsModalOpen(false);
          }}
        />

      </div>
    </div>
  );
}
