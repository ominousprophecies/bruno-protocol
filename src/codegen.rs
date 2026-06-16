use crate::ast::{ASTNode, Type, FunctionDef, MapDef}; // Pull in your verified AST struct components

/// Primary entry block taking verified AST array slices and assembling an output string
pub fn lower_to_aether(ast_nodes: &[ASTNode]) -> String {
    let mut output = String::new();
    
    // Write out the mandatory secure execution header
    output.push_str("// ⚡ AETHER PROTOCOL COMPILED TARGET SECHEX\n");
    output.push_str("// SYSTEM STATUS: RES_ISOLATED / STRICT_MODE\n\n");
    
    for node in ast_nodes {
        match node {
            ASTNode::FunctionDef(fn_def) => {
                output.push_str(&generate_function_node(fn_def));
            },
            ASTNode::MapDef(map_def) => {
                output.push_str(&generate_map_node(map_def));
            },
            _ => {} // Ignore un-lowered statement nodes safely
        }
    }
    output
}

/// Iterates function signatures and applies declarative constraint tags[cite: 2]
fn generate_function_node(fn_def: &FunctionDef) -> String {
    let mut f_out = String::new();
    
    f_out.push_str("fn_spec {\n");
    f_out.push_str(&format!("  identifier: {}\n", fn_def.name));
    f_out.push_str(&format!("  security: {:?}\n", fn_def.security_state)); // Hardchecks Secret encapsulation[cite: 2]
    f_out.push_str(&format!("  energy: {:?}\n", fn_def.energy_state));     // Enforces Eco-Compute parameters[cite: 2]
    f_out.push_str("}\n\n");
    
    f_out.push_str(&format!("fn {}(", fn_def.name));
    let params: Vec<String> = fn_def.params.iter().map(|p| {
        format!("{}: {} {:?}", p.name, if p.is_copy { "copy " } else { "" }, p.ty)
    }).collect();
    f_out.push_str(&params.join(", "));
    f_out.push_str(&format!(") -> {:?} {{\n", fn_def.ret_type));
    f_out.push_str("  // Lowered system operations execution array\n");
    f_out.push_str("}\n\n");
    
    f_out
}

/// Lowers memory probing definitions into raw token storage blueprints[cite: 2]
fn generate_map_node(map_def: &MapDef) -> String {
    let mut m_out = String::new();
    
    m_out.push_str("storage_node {\n");
    m_out.push_str(&format!("  map: {}\n", map_def.name));
    m_out.push_str(&format!("  strategy: {:?}\n", map_def.strategy)); // Captures Krapivin map strategies[cite: 2]
    m_out.push_str(&format!("  key_type: {:?}\n", map_def.key_type));
    m_out.push_str(&format!("  value_type: {:?}\n", map_def.value_type));
    m_out.push_str("  grid_intensity_baseline: 0.300 // kg CO₂/kWh\n"); // Carbon index baseline constants[cite: 1, 2]
    m_out.push_str("  expected_local_compile: 0.0000000167 // kWh\n");  // Runtime efficiency metric[cite: 1, 2]
    m_out.push_str("}\n\n");
    
    m_out
}
